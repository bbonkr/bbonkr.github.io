import * as React from 'react';

import { Link, graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

interface PageContext {
    category: string;
}

interface Frontmatter {
    title: string;
    tags?: string[];
    categories?: string[];
    date: Date;
}

interface Field {
    slug: string;
}

interface EdgeNode {
    frontmatter: Frontmatter;
    fields: Field;
}

interface Edge {
    node: EdgeNode;
}

interface Group {
    fieldValue: string;
}

interface MarkdownRemark {
    totalCount: number;
    group: Group[];
    edges: Edge[];
}

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata: SiteMetadata;
}
interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const CategoriesTemplate = ({
    pageContext,
    data,
    location,
}: PageProps<Data, PageContext>) => {
    // const { category } = pageContext;
    const { totalCount, group, edges } = data.allMarkdownRemark;
    const category = group.find((_, index) => index === 0)?.fieldValue ?? '';
    const categoryHeader = `${totalCount} post${
        totalCount === 1 ? '' : 's'
    } in "${category}"`;

    const siteTitle = data.site.siteMetadata?.title || `Title`;

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={category} description={categoryHeader} />
            <h1>{categoryHeader}</h1>
            <ul>
                {edges.map(({ node }) => {
                    const { slug } = node.fields;
                    const { title } = node.frontmatter;
                    return (
                        <li key={slug}>
                            <Link to={slug}>{title}</Link>
                        </li>
                    );
                })}
            </ul>

            <Link to="/categories">All categories</Link>
        </Layout>
    );
};

export default CategoriesTemplate;

export const pageQuery = graphql`
    query BlogPostByCategory($category: String!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { categories: { in: [$category] } } }
        ) {
            group(field: frontmatter___categories) {
                fieldValue
            }
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        categories
                        tags
                    }
                }
            }
        }
    }
`;
