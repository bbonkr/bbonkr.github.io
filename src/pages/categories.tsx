import * as React from 'react';

import kebabCase from 'lodash/kebabCase';

import { Link, graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Bio from '../components/bio';

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata: SiteMetadata;
}

interface Category {
    fieldValue: string;
    totalCount: number;
}

interface MarkdownRemark {
    group: Category[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const CategoriesPage = ({ location, data }: PageProps<Data>) => {
    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;
    return (
        <Layout location={location} title={title}>
            <Seo title="All categories" />
            <Bio />
            <div>
                <h1>Categories</h1>
                <ul>
                    {group.map((category) => (
                        <li key={category.fieldValue}>
                            <Link
                                to={`/categories/${kebabCase(
                                    category.fieldValue
                                )}`}
                            >
                                {category.fieldValue} ({category.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default CategoriesPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
            }
        }
    }
`;
