import * as React from 'react';

import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

interface PageContext {
    tag: string;
}

interface Frontmatter {
    title: string;
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

interface MarkdownRemark {
    totalCount: number;
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

interface TagsProps {
    pageContext: PageContext;
    data: Data;
    location: Location;
}

const TagTemplate = ({ pageContext, data, location }: TagsProps) => {
    const { tag } = pageContext;
    const { totalCount, edges } = data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`;
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={tag} description={tagHeader} />
            <h1>{tagHeader}</h1>
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

            <Link to="/tags">All tags</Link>
        </Layout>
    );
};

export default TagTemplate;

export const pageQuery = graphql`
    query BlogPostByTag($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
