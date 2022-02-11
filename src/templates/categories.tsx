import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Edge, Post } from '../models/data';
import PostListItem from '../components/post-list-item';
import { Hr } from '../components/hr';
import { PageNav } from '../components/pagination/page-nav';

interface PageContext {
    category: string;
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

interface Category {
    fieldValue: string;
    totalCount: number;
    edges: Post[];
}

interface MarkdownRemark {
    // group: Category[];
    edges: Edge[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const CategoryPageTemplate = ({
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
            <Seo title={`Posts categorized by ${pageContext.category}`} />
            {/* <Bio /> */}
            <header>
                <aside>
                    <p className="text-base md:text-sm text-green-500 font-bold">
                        &lt;{' '}
                        <Link
                            to="/categories"
                            className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                        >
                            BACK TO CATEGORIES
                        </Link>
                    </p>
                </aside>
                <h1>
                    {`Posts categorized by`}{' '}
                    <span className="text-green-500">{`${pageContext.category}`}</span>{' '}
                </h1>
            </header>

            <main>
                {edges.map((edge) => {
                    return (
                        <PostListItem key={edge.node.fields.slug} post={edge} />
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
        </Layout>
    );
};

export default CategoryPageTemplate;

export const pageQuery = graphql`
    query postsByCategory($category: String, $skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { categories: { in: [$category] } } }
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
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 1024) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        draft
                        comments
                    }
                }
            }
        }
    }
`;
