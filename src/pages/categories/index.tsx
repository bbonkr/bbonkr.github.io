import * as React from 'react';

import { graphql, PageProps } from 'gatsby';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import Bio from '../../components/bio';
import { Category } from '../../models/data';
import PostListItem from '../../components/post-list-item';
import { CategoryList } from '../../components/categories';

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata: SiteMetadata;
}

interface MarkdownRemark {
    group: Category[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const CategoriesPage = ({ location, data }: PageProps<Data>) => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>();

    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;

    const handleClickTag = (tag: string) => {
        setSelectedCategory((_) => tag);
    };

    return (
        <Layout location={location} title={title}>
            <Seo title="All categories" />
            <Bio />
            <div>
                <h1>Categories</h1>

                <CategoryList
                    categories={group}
                    selectedCategory={selectedCategory}
                    onChange={handleClickTag}
                />
            </div>
            {selectedCategory && (
                <div>
                    {data.allMarkdownRemark.group
                        .find((tag) => tag.fieldValue === selectedCategory)
                        ?.edges.map((edge) => {
                            return (
                                <PostListItem
                                    key={edge.node.fields.slug}
                                    post={edge}
                                />
                            );
                        })}
                </div>
            )}
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
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
