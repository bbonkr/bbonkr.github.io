import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Posts } from '../models/data';
import PostListItem from '../components/post-list-item';

interface FormValues {
    keyword?: string;
}

interface FormState {
    values?: FormValues;
}

const SearchPage = ({ data, location }: PageProps<Posts>) => {
    const [formState, setFormState] = React.useState<FormState>({});

    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const posts = data.allMarkdownRemark.edges;

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

    const filteredPosts = React.useMemo(() => {
        return (posts ?? []).filter((x) => {
            if (!formState?.values?.keyword) {
                return false;
            }

            const regex = new RegExp(`.*${formState.values.keyword}.*`, 'ig');
            if (x.node.rawMarkdownBody && regex.test(x.node.rawMarkdownBody)) {
                return true;
            }

            if (
                x.node.frontmatter.title &&
                regex.test(x.node.frontmatter.title)
            ) {
                return true;
            }

            return false;
        });
    }, [formState.values]);

    if (posts && posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Seo title="All posts" />

                <p>
                    No blog posts found. Add markdown posts to "content/blog"
                    (or the directory you specified for the
                    "gatsby-source-filesystem" plugin in gatsby-config.js).
                </p>
            </Layout>
        );
    }

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="Search" />

            <header>
                <h1>Search</h1>
            </header>
            <main>
                <div className="w-full">
                    <label className="block">
                        <input
                            type="text"
                            name="keyword"
                            className="mt-1 block w-full rounded-md shadow-sm border-green-600 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-800"
                            onChange={handleChange}
                            value={formState.values?.keyword ?? ''}
                            placeholder="Keyword"
                        />
                    </label>
                </div>

                <div className="flex flex-col justify-center items-center">
                    {filteredPosts.length > 0 ? (
                        <React.Fragment>
                            <p className="py-4 self-start">{`Found ${
                                filteredPosts.length
                            } post${filteredPosts.length > 1 ? 's' : ''}`}</p>

                            <ol className="list-style-none">
                                {filteredPosts.map((post) => {
                                    return (
                                        <li key={post.node.fields.slug}>
                                            <PostListItem post={post} />
                                        </li>
                                    );
                                })}
                            </ol>
                        </React.Fragment>
                    ) : formState.values?.keyword ? (
                        <p className="py-4">
                            Does not find post about {formState.values?.keyword}
                        </p>
                    ) : (
                        <p></p>
                    )}
                </div>
            </main>
        </Layout>
    );
};

export const pageQuery = graphql`
    query searchPageQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 2000, sort: { frontmatter: { date: DESC } }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
                        description
                        tags
                        categories
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED)
                            }
                        }
                    }
                    rawMarkdownBody
                }
            }
        }
    }
`;

export default SearchPage;
