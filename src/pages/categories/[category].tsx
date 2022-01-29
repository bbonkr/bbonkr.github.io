import * as React from 'react';

import kebabCase from 'lodash/kebabCase';

import { Link, graphql, PageProps } from 'gatsby';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import Bio from '../../components/bio';
import { Post } from '../../models/data';
import PostListItem from '../../components/post-list-item';

interface PageContext {
    category: string;
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

interface Category {
    fieldValue: string;
    totalCount: number;
    edges: Post[];
}

interface MarkdownRemark {
    group: Category[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const CategoryPage = ({
    location,
    data,
    params,
    pageContext,
}: PageProps<Data, PageContext>) => {
    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;

    console.info(pageContext.category, params.category, data);

    return (
        <Layout location={location} title={title}>
            <Seo title={`Posts categorized by #${params.category}`} />
            <Bio />
            <div>
                <h1>
                    {`Posts categorized by`}{' '}
                    <span className="text-green-500">{`#${params.category}`}</span>{' '}
                </h1>
            </div>

            <div>
                {group
                    .find((_, index) => index === 0)
                    // .find((tag) => tag.fieldValue === selectedCategory)
                    ?.edges.map((edge) => {
                        return (
                            <PostListItem
                                key={edge.node.fields.slug}
                                post={edge}
                            />
                        );
                    })}
            </div>
        </Layout>
    );
};

export default CategoryPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC } # filter: { frontmatter: { categories: { in: [$category] } } }
        ) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
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
    }
`;
