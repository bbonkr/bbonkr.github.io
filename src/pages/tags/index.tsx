import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { graphql, PageProps, navigate } from 'gatsby';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import Bio from '../../components/bio';
import { Tag } from '../../models/data';
import { TagList } from '../../components/tags';

interface FormValues {
    tag?: string;
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
    group: Tag[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const TagsPage = ({ location, data }: PageProps<Data>) => {
    const [formState, setFormState] = React.useState<FormState>({ values: {} });
    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;

    const handleClickTag = (tag: string) => {
        navigate(`/tags/${kebabCase(tag)}`);
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

    // React.useEffect(() => {
    //     console.info('formState', formState);
    // }, []);

    return (
        <Layout location={location} title={title}>
            <Seo title="All tags" />
            <Bio />
            <header>
                <h1>Tags</h1>
            </header>
            <main>
                <div className="w-full">
                    <label className="block">
                        <input
                            type="text"
                            name="tag"
                            className="mt-1 block w-full rounded-md shadow-sm border-green-600 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-800"
                            onChange={handleChange}
                            value={formState.values?.tag ?? ''}
                            placeholder="Filter"
                        />
                    </label>
                </div>

                <TagList
                    tags={group.filter((x) =>
                        !formState.values || !formState.values?.tag
                            ? true
                            : formState.values?.tag
                            ? x.fieldValue
                                  .toLowerCase()
                                  .startsWith(
                                      formState.values?.tag?.toLowerCase()
                                  )
                            : false
                    )}
                    onChange={handleClickTag}
                />
            </main>
        </Layout>
    );
};

export default TagsPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            group(field: frontmatter___tags) {
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
