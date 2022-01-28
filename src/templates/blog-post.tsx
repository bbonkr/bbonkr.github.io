import * as React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Data } from '../models/data';
import GitHubButtons from '../components/github-button';

const BlogPostTemplate = ({ data, location }: PageProps<Data>) => {
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const { previous, next } = data;

    return (
        <Layout location={location} title={siteTitle}>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header className="font-sans">
                    <p className="text-base md:text-sm text-green-500 font-bold">
                        &lt;{' '}
                        <Link
                            to="/"
                            className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                        >
                            BACK TO BLOG
                        </Link>
                    </p>
                    <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
                        {post.frontmatter.title}
                    </h1>
                    <p className="text-sm md:text-base font-normal text-gray-600">
                        {post.frontmatter.date}
                    </p>
                </header>

                <section
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                />

                {post.frontmatter.github && (
                    <section className="article-body">
                        <h2>GitHub Repository</h2>
                        <GitHubButtons
                            repo={post.frontmatter.github.repo}
                            owner={post.frontmatter.github.owner}
                            showCount
                            size="large"
                        />
                    </section>
                )}

                <aside className="text-base md:text-sm text-gray-500 px-4 py-6">
                    <span>Tags:</span>
                    <ul className="list-style-none flex gap-3 flex-wrap break-words">
                        {post.frontmatter.tags?.map((tag) => {
                            return (
                                <li key={tag}>
                                    <Link
                                        to={`/tags/${kebabCase(tag)}`}
                                        className="text-base md:text-sm text-green-500 no-underline hover:underline"
                                    >
                                        {tag}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

                <footer>
                    <nav>
                        <ul className="font-sans flex justify-between content-center px-4 pb-12">
                            <li className="flex-start text-left">
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
                            </li>
                            <li className="flex-end text-right">
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
                            </li>
                        </ul>
                    </nav>
                </footer>
            </article>
            <Bio />
        </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                title
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
            }
        }
        previous: markdownRemark(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        next: markdownRemark(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`;
