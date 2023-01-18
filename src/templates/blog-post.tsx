import * as React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { getSrc, GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Data } from '../models/data';
import GitHubButtons from '../components/github-button';
import { SimpleTagList } from '../components/tags';
import ThemeProvider from '../context/theme/theme-context';
import { SimpleCategoryList } from '../components/categories';
import { Utterances } from '../components/comment';

const BlogPostTemplate = ({ data, location }: PageProps<Data>) => {
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const { previous, next } = data;
    const hasFeaturedImage = Boolean(
        post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
    );

    const featuredImageSrc = post.frontmatter.featuredImage?.childImageSharp
        ?.gatsbyImageData
        ? getSrc(
              post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
          )
        : undefined;

    return (
        <Layout location={location} title={siteTitle}>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
                image={featuredImageSrc}
            />
            <article
                className="blog-post py-6"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header className="font-sans relative">
                    {post.frontmatter.featuredImage?.childImageSharp
                        ?.gatsbyImageData && (
                        <React.Fragment>
                            <GatsbyImage
                                image={
                                    post.frontmatter.featuredImage
                                        .childImageSharp?.gatsbyImageData
                                }
                                alt={`Featured image for ${post.frontmatter.title}`}
                                className="blur-sm max-w-full max-h-80"
                            />
                        </React.Fragment>
                    )}

                    <div
                        className={`${
                            hasFeaturedImage
                                ? 'px-3 py-3 bg-gray-900 absolute bottom-0 l-2 r-2 w-full opacity-80 '
                                : ''
                        }`}
                    >
                        <p className="text-base md:text-sm text-green-500 font-bold">
                            &lt;{' '}
                            <Link
                                to="/blog"
                                className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                            >
                                BACK TO BLOG
                            </Link>
                        </p>
                        <aside className="pt-6">
                            {post.frontmatter.categories && (
                                <SimpleCategoryList
                                    categories={post.frontmatter.categories}
                                />
                            )}
                        </aside>

                        <h1
                            className={`font-bold font-sans break-normal ${
                                hasFeaturedImage
                                    ? 'text-gray-100'
                                    : 'text-gray-900 dark:text-gray-100'
                            }    pb-2 text-3xl md:text-4xl break-words`}
                        >
                            {post.frontmatter.title}
                        </h1>
                        <p
                            className={`text-sm md:text-base font-normal ${
                                hasFeaturedImage
                                    ? 'text-gray-400'
                                    : 'text-gray-600 dark:text-gray-400'
                            }  `}
                        >
                            {post.frontmatter.date.toLocaleString()}
                        </p>
                    </div>
                </header>

                <section
                    className="article-body pt-6"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                />

                {post.frontmatter.github &&
                    post.frontmatter.github.owner &&
                    post.frontmatter.github.repo && (
                        <section className="article-body">
                            <h2>GitHub Repository</h2>
                            <ThemeProvider.Consumer>
                                {(state) => (
                                    <GitHubButtons
                                        repo={post.frontmatter.github!.repo}
                                        owner={post.frontmatter.github!.owner}
                                        showCount
                                        size={'large'}
                                        theme={state.theme}
                                    />
                                )}
                            </ThemeProvider.Consumer>
                        </section>
                    )}

                <aside className="text-base md:text-sm text-gray-500 py-6">
                    <span>Tags:</span>
                    <ul className="list-style-none flex gap-3 flex-wrap">
                        <SimpleTagList tags={post.frontmatter.tags} />
                    </ul>
                </aside>

                <hr className="border-b-2 border-gray-400 mb-8" />

                <footer>
                    <nav>
                        <div className="font-sans container max-w-4xl mx-auto flex">
                            <div className="w-full mx-auto flex flex-wrap">
                                <div className="flex-start text-left md:w-1/2 flex-1">
                                    {previous && (
                                        <React.Fragment>
                                            <span className="text-xs md:text-sm font-normal text-gray-600">
                                                &lt; Previous Post
                                            </span>

                                            <Link
                                                to={previous.fields.slug}
                                                rel="prev"
                                                className="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                                            >
                                                <br />
                                                {previous.frontmatter.title}
                                            </Link>
                                        </React.Fragment>
                                    )}
                                </div>
                                <div className="flex-end text-right md:w-1/2 flex-1">
                                    {next && (
                                        <React.Fragment>
                                            <span className="text-xs md:text-sm font-normal text-gray-600">
                                                Next Post &gt;
                                            </span>
                                            <br />
                                            <Link
                                                to={next.fields.slug}
                                                rel="next"
                                                className="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                                            >
                                                {next.frontmatter.title}
                                            </Link>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>

                    <ThemeProvider.Consumer>
                        {(themeState) => (
                            <Utterances theme={themeState.theme} />
                        )}
                    </ThemeProvider.Consumer>
                </footer>
            </article>
        </Layout>
    );
};

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                title
                siteUrl
            }
        }
        markdownRemark(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                categories
                tags
                github {
                    owner
                    repo
                }
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(layout: FIXED)
                    }
                }
                draft
                comments
            }
        }
        previous: markdownRemark(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
                draft
                comments
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(layout: FIXED)
                    }
                }
            }
        }
        next: markdownRemark(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
                draft
                comments
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(layout: FIXED)
                    }
                }
            }
        }
    }
`;

export default BlogPostTemplate;
