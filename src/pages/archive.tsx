import * as React from 'react';
import { graphql, PageProps } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Posts } from '../models/data';
import PostListItem from '../components/post-list-item';

const BlogPage = ({ data, location }: PageProps<Posts>) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const posts = data.allMarkdownRemark.edges;

    if (posts && posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Seo title="All posts" />

                <p>
                    No blog posts found. Add markdown posts to "content/blog"
                    (or the directory you specified for the
                    "gatsby-source-filesystem" plugin in gatsby-config.js).
                </p>

                <Bio />
            </Layout>
        );
    }

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="All posts" />
            <Bio />
            <ol className="list-style-none">
                {posts?.map((post) => {
                    const title =
                        post.node.frontmatter.title || post.node.fields.slug;

                    return (
                        <li key={post.node.fields.slug}>
                            <PostListItem post={post} />
                        </li>
                    );
                })}
            </ol>
        </Layout>
    );
};

export default BlogPage;

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
                        tags
                        categories
                    }
                }
            }
        }
    }
`;
