import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Posts } from '../models/data';
import PostListItem from '../components/post-list-item';

const HomePage = ({ data, location }: PageProps<Posts>) => {
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
            </Layout>
        );
    }

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="Recent posts" />
            <ol className="list-style-none">
                {posts?.map((post) => {
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

export default HomePage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 6
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
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 1024) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
