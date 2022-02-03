import { graphql, Link, PageProps } from 'gatsby';
import * as React from 'react';
import Bio from '../components/bio';
import { Hr } from '../components/hr';
import Layout from '../components/layout';
import { PageNav } from '../components/pagination/page-nav';
import PostListItem from '../components/post-list-item';
import Seo from '../components/seo';
import { Site, MarkdownRemarks } from '../models/data';

interface BlogListTemplatePageContext {
    limit: number;
    skip: number;
    totalPages: number;
    currentPage: number;
    basePath: string;
}

interface Data {
    allMarkdownRemark: MarkdownRemarks;
    site: Site;
}

const BlogListTemplate = ({
    data,
    pageContext,
    location,
}: PageProps<Data, BlogListTemplatePageContext>) => {
    const {
        site: { siteMetadata },
        allMarkdownRemark: { edges },
    } = data;
    return (
        <Layout location={location} title={siteMetadata?.title ?? ''}>
            <Seo
                title={`Posts on ${pageContext.currentPage} of ${
                    pageContext.totalPages
                } page${pageContext.totalPages > 1 ? 's' : ''}`}
            />

            <Bio />
            {/* <header>
                <aside className="flex gap-2">
                    <span>{`Posts on`}</span>
                    <span className="text-green-500">{`${pageContext.currentPage}`}</span>
                    <span>of</span>
                    <span>{`${pageContext.totalPages} page${
                        pageContext.totalPages > 1 ? 's' : ''
                    }`}</span>
                </aside>
                <h1 className="flex gap-2"></h1>
            </header> */}

            <main>
                {edges?.map((edge) => {
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

export default BlogListTemplate;

export const blogListQuery = graphql`
    query blogListQuery($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
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
                    }
                }
            }
        }
    }
`;