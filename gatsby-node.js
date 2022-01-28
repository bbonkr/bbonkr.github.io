const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const kebabCase = require('lodash/kebabCase');

const createPostPages = async (graphql, actions, reporter) => {
    const { createPage } = actions;
    const tempalte = path.resolve(`./src/templates/blog-post.tsx`);

    const result = await graphql(
        `
            {
                allPosts: allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: ASC }
                    limit: 2000
                ) {
                    edges {
                        node {
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                tags
                                categories
                                github {
                                    owner
                                    repo
                                }
                            }
                        }
                    }
                }
            }
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        );
        return;
    }

    // const edges = result.data.allPosts.edges;
    const { allPosts } = result.data;

    // Create blog posts pages
    // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
    // `context` is available in the template as a prop and as a variable in GraphQL

    const { edges } = allPosts;

    if (edges.length > 0) {
        edges.forEach((item, index) => {
            const post = item.node;
            const previousPostId =
                index === 0 ? null : edges[index - 1].node.id;
            const nextPostId =
                index === edges.length - 1 ? null : edges[index + 1].node.id;

            createPage({
                path: post.fields.slug,
                component: tempalte,
                context: {
                    id: post.id,
                    previousPostId,
                    nextPostId,
                },
            });
        });

        reporter.info('Post pages created.');
    } else {
        reporter.info('Pass post pages.');
    }
};

const createTagPages = async (graphql, actions, reporter) => {
    const { createPage } = actions;
    const template = path.resolve(`./src/templates/tags.tsx`);

    const result = await graphql(`
        {
            tagGroups: allMarkdownRemark(limit: 2000) {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`There was an error loading tags`, result.errors);
        return;
    }

    const tags = result.data.tagGroups.group;

    if (typeof tags !== 'undefined' && tags.length > 0) {
        tags.forEach((item) => {
            if (typeof item !== 'undefined' && item.fieldValue) {
                createPage({
                    path: `/tags/${kebabCase(item.fieldValue)}/`,
                    component: template,
                    context: {
                        tag: item.fieldValue,
                    },
                });
            }
        });
        reporter.info('Tag pages created.');
    } else {
        reporter.info('Pass tag pages.');
    }
};

const createCategoryPages = async (graphql, actions, reporter) => {
    const { createPage } = actions;
    const template = path.resolve(`./src/templates/categories.tsx`);

    const result = await graphql(`
        {
            categoryGroups: allMarkdownRemark(limit: 2000) {
                group(field: frontmatter___categories) {
                    fieldValue
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading categories`,
            result.errors
        );

        return;
    }

    const categories = result.data.categoryGroups.group;

    if (typeof categories !== 'undefined' && categories.length > 0) {
        categories.forEach((item) => {
            if (typeof item === 'undefined' && item.fieldValue) {
                createPage({
                    path: `/categories/${kebabCase(item.fieldValue)}/`,
                    component: template,
                    context: {
                        category: item.fieldValue,
                    },
                });
            }
        });

        reporter.info('Category pages created.');
    } else {
        reporter.info('Passed category pages.');
    }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
    // const { createPage } = actions;

    // Define a template for blog post

    // Get all markdown blog posts sorted by date

    await createPostPages(graphql, actions, reporter);

    // await createTagPages(graphql, actions, reporter);

    // await createCategoryPages(graphql, actions, reporter);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });

        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      github: String
      linkedin: String
      facebook: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type GitHub {
        owner: String
        repo: String
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      categories: [String!]
      tags: [String!]
      github: GitHub
    }

    type Fields {
      slug: String
    }
  `);
};
