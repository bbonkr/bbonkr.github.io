import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Posts } from '../models/data';

interface BlogIndexProps {
    data: Posts;
    location: Location;
}

const BlogIndex = ({ data, location }: BlogIndexProps) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const posts = data.allMarkdownRemark.edges;

    if (posts && posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Seo title="All posts" />
                <Bio />
                <p>
                    No blog posts found. Add markdown posts to "content/blog"
                    (or the directory you specified for the
                    "gatsby-source-filesystem" plugin in gatsby-config.js).
                </p>
            </Layout>
        );
    }

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="All posts" />
            <Bio />
            <ol style={{ listStyle: `none` }}>
                {posts?.map((post) => {
                    const title =
                        post.node.frontmatter.title || post.node.fields.slug;

                    return (
                        <li key={post.node.fields.slug}>
                            <article
                                className="post-list-item"
                                itemScope
                                itemType="http://schema.org/Article"
                            >
                                <header>
                                    <h2>
                                        <Link
                                            to={post.node.fields.slug}
                                            itemProp="url"
                                        >
                                            <span itemProp="headline">
                                                {title}
                                            </span>
                                        </Link>
                                    </h2>
                                    <small>{post.node.frontmatter.date}</small>
                                    <ul>
                                        {post.node.frontmatter.tags?.map(
                                            (tag) => (
                                                <li key={tag}>{tag}</li>
                                            )
                                        )}
                                    </ul>
                                </header>
                                <section>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                (post.node.frontmatter
                                                    .description ||
                                                    post.node.excerpt) ??
                                                '',
                                        }}
                                        itemProp="description"
                                    />
                                </section>
                            </article>
                        </li>
                    );
                })}
            </ol>
        </Layout>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 10
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                    }
                }
            }
        }
    }
`;
