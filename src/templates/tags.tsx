import * as React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';

import { Post, Edge } from '../models/data';
import PostListItem from '../components/post-list-item';
import { PageNav } from '../components/pagination/page-nav';
import { Hr } from '../components/hr';

interface PageContext {
    tag: string;
    limit: number;
    skip: number;
    totalPages: number;
    currentPage: number;
    basePath: string;
}

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata: SiteMetadata;
}

// interface Edge {
//     node: Post;
// }

interface Tag {
    fieldValue: string;
    totalCount: number;
    edges: Post[];
}

interface MarkdownRemark {
    edges: Edge[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const TagPageTemplate = ({
    location,
    data,
    pageContext,
}: PageProps<Data, PageContext>) => {
    const {
        allMarkdownRemark: { edges },
        site: {
            siteMetadata: { title },
        },
    } = data;

    return (
        <Layout location={location} title={title}>
            <Seo title={`Post taged by #${pageContext.tag}`} />
            <section className="py-6">
                <header>
                    <aside>
                        <p className="text-base md:text-sm text-green-500 font-bold">
                            &lt;{' '}
                            <Link
                                to="/tags"
                                className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                            >
                                BACK TO TAGS
                            </Link>
                        </p>
                    </aside>
                    <h1>
                        {`Post taged by`}{' '}
                        <span className="text-green-500">{`#${pageContext.tag}`}</span>{' '}
                    </h1>
                </header>

                <main>
                    {edges.map((edge) => {
                        return (
                            <PostListItem
                                key={edge.node.fields.slug}
                                post={edge}
                            />
                        );
                    })}
                </main>

                <Hr />

                <footer>
                    <PageNav
                        current={pageContext.currentPage}
                        total={pageContext.totalPages}
                        path={pageContext.basePath}
                        showDescription
                        useShortcut
                    />
                </footer>
            </section>
        </Layout>
    );
};

export const pageQuery = graphql`
    query postsByTag($tag: String, $skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { tags: { in: [$tag] } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    excerpt(format: PLAIN)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        tags
                        categories
                        draft
                        comments
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED)
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default TagPageTemplate;
