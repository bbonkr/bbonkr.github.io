import * as React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Data } from '../models/data';
import GitHubButtons from '../components/github-button';
interface BlogPostTemplateProps {
    data: Data;
    location: Location;
}

const BlogPostTemplate = ({ data, location }: BlogPostTemplateProps) => {
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
                <header>
                    <h1 itemProp="headline">{post.frontmatter.title}</h1>
                    <p>{post.frontmatter.date}</p>
                </header>
                <section
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                />

                {post.frontmatter.github && (
                    <section>
                        <h2>GitHub Repository</h2>
                        <GitHubButtons
                            repo={post.frontmatter.github.repo}
                            owner={post.frontmatter.github.owner}
                            showCount
                            size="large"
                        />
                    </section>
                )}

                <aside>
                    <span>Tags:</span>
                    <ul className="tags-list">
                        {post.frontmatter.tags?.map((tag) => {
                            return (
                                <li key={tag}>
                                    <Link to={`/tags/${kebabCase(tag)}`}>
                                        {tag}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                <hr />

                <footer>
                    <Bio />
                </footer>
            </article>

            <nav className="blog-post-nav">
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
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
