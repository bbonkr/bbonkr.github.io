import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { graphql, PageProps, navigate } from 'gatsby';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import { Category } from '../../models/data';
import { CategoryList } from '../../components/categories';

interface FormValues {
    category?: string;
}

interface FormState {
    values?: FormValues;
}

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
    const [formState, setFormState] = React.useState<FormState>({ values: {} });

    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;

    const handleClickTag = (category: string) => {
        navigate(`/categories/${kebabCase(category)}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        setFormState((prevState) => ({
            ...(prevState ?? {}),
            values: {
                ...(prevState ?? {}).values,
                [name]: value,
            },
        }));
    };

    return (
        <Layout location={location} title={title}>
            <Seo title="All categories" />
            <section className="py-6">
                <header>
                    <h1>Categories</h1>
                </header>
                <main>
                    <div className="w-full">
                        <label className="block">
                            <input
                                type="text"
                                name="category"
                                className="mt-1 block w-full rounded-md shadow-sm border-green-600 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-800"
                                onChange={handleChange}
                                value={formState.values?.category ?? ''}
                                placeholder="Filter"
                            />
                        </label>
                    </div>

                    <CategoryList
                        categories={group.filter((x) =>
                            !formState.values || !formState.values?.category
                                ? true
                                : formState.values?.category
                                ? x.fieldValue
                                      .toLowerCase()
                                      .startsWith(
                                          formState.values?.category?.toLowerCase()
                                      )
                                : false
                        )}
                        onChange={handleClickTag}
                    />
                </main>
            </section>
        </Layout>
    );
};

export const pageQuery = graphql`
    query categoriesPageQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            group(field: { frontmatter: { categories: SELECT } }) {
                fieldValue
                totalCount
                edges {
                    node {
                        excerpt(format: PLAIN)
                        fields {
                            slug
                        }
                        frontmatter {
                            date(formatString: "YYYY-MM-DD")
                            title
                            tags
                            categories
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
    }
`;

export default CategoriesPage;
