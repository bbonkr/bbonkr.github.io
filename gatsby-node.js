const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const kebabCase = require('lodash/kebabCase');

const createPostPages = async (createPage, reporter, allPosts) => {
    // const { createPage } = actions;
    const tempalte = path.resolve(`./src/templates/blog-post.tsx`);

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
    }
};

const createTagPages = async (createPage, reporter, tagGroups) => {
    const template = path.resolve(`./src/templates/tags.tsx`);

    const tags = tagGroups.group;

    if (typeof tags !== 'undefined' && tags.length > 0) {
        tags.forEach((item) => {
            if (typeof item !== 'undefined' && item.fieldValue) {
                const postsPerPage = 6;
                const posts = item.edges;
                const totalPages = Math.ceil(posts.length / postsPerPage);
                Array.from({ length: totalPages }).forEach((_, index) => {
                    createPage({
                        path: `/tags/${kebabCase(item.fieldValue)}${
                            index === 0 ? '' : `/${index + 1}`
                        }`,
                        component: template,
                        context: {
                            tag: item.fieldValue,
                            limit: postsPerPage,
                            skip: index * postsPerPage,
                            totalPages,
                            currentPage: index + 1,
                            basePath: `/tags/${kebabCase(item.fieldValue)}`,
                        },
                    });
                });
            }
        });
    }
};

const createCategoryPages = async (createPage, reporter, categoryGroups) => {
    const template = path.resolve(`./src/templates/categories.tsx`);

    const categories = categoryGroups.group;

    if (typeof categories !== 'undefined' && categories.length > 0) {
        categories.forEach((item) => {
            const postsPerPage = 6;
            const posts = item.edges;
            const totalPages = Math.ceil(posts.length / postsPerPage);

            if (typeof item !== 'undefined' && item.fieldValue) {
                Array.from({ length: totalPages }).forEach((_, index) => {
                    createPage({
                        path: `/categories/${kebabCase(item.fieldValue)}${
                            index === 0 ? '' : `/${index + 1}`
                        }`,
                        component: template,
                        context: {
                            category: item.fieldValue,
                            limit: postsPerPage,
                            skip: index * postsPerPage,
                            totalPages,
                            currentPage: index + 1,
                            basePath: `/categories/${kebabCase(
                                item.fieldValue
                            )}`,
                        },
                    });
                });
            }
        });
    }
};

const createBlogListPages = async (createPage, reporter, allPosts) => {
    const template = path.resolve(`./src/templates/blog-list.tsx`);
    const postsPerPage = 6;
    const posts = allPosts.edges;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: totalPages }).forEach((_, index) => {
        createPage({
            path: index === 0 ? `/blog` : `/blog/${index + 1}`,
            component: template,
            context: {
                limit: postsPerPage,
                skip: index * postsPerPage,
                totalPages,
                currentPage: index + 1,
                basePath: '/blog',
            },
        });
    });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    // Define a template for blog post

    // Get all markdown blog posts sorted by date

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

                categoryGroups: allMarkdownRemark(limit: 2000) {
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

                tagGroups: allMarkdownRemark(limit: 2000) {
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
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(`There was an error loading data`, result.errors);
        return;
    }

    await createPostPages(createPage, reporter, result.data.allPosts);

    await createTagPages(createPage, reporter, result.data.tagGroups);

    await createCategoryPages(createPage, reporter, result.data.categoryGroups);

    await createBlogListPages(createPage, reporter, result.data.allPosts);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({
            node,
            getNode,
            // basePath: `posts`,
        });

        const rewriteSlug = (slug) => {
            let datePart = '';
            let title = '';

            const tokens = slug.split('/').filter((token) => Boolean(token));

            if (tokens.length > 0) {
                datePart = tokens[0];
                if (tokens.length > 1 && tokens[1].toLowerCase() !== 'index') {
                    title = tokens[1];
                }
            }

            const dayRegExp =
                /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])(?:-(.*))?$/g;
            if (datePart.match(dayRegExp)) {
                if (!title || title.toLowerCase() === 'index') {
                    title = datePart.replace(dayRegExp, '$4');
                }

                title = kebabCase(title);
                datePart = datePart.replace(dayRegExp, '$1/$2/$3');
            }

            slug = `/${datePart}/${title}/`;
            return slug;
        };

        const rewriteNode = (node) => {
            // 마크다운 파일 내 퍼블리쉬 필드가 비어있을 시 오류가 나지 않도록 하기 위함
            // development 환경일 시 published 필드가 모두 true이도록 하기 위함
            // if (
            //   node.frontmatter.published === undefined ||
            //   process.env.NODE_ENV === 'development'
            // ) {
            //   node.frontmatter.published = true;
            // }

            // 마크다운 파일 내 태그 필드가 비어있을 시 오류가 나지 않도록 하기 위함
            if (!node.frontmatter.tags || node.frontmatter.tags === '') {
                node.frontmatter.tags = ['undefined'];
            }
            // 태그 필드가 배열이 아닌 문자열 하나일때 배열로 덮음
            else if (typeof node.frontmatter.tags === 'string') {
                node.frontmatter.tags = [node.frontmatter.tags.toLowerCase()];
            }

            // 마크다운 파일 내 keywords 필드가 비어있을 시 오류가 나지 않도록 하기 위함
            // if (!node.frontmatter.keywords) {
            //     node.frontmatter.keywords = [
            //         node.siteMetadata.title,
            //         node.siteMetadata.author.name,
            //         ...(node.frontmatter.tags || []),
            //     ];
            // }

            // markdown 내 date의 timezone 제거
            // if (node.frontmatter.date.indexOf('+') !== -1) {
            //     const date = new Date(node.frontmatter.date.split('+')[0]);
            //     node.frontmatter.date = date;
            // } else {
            //     node.frontmatter.date = new Date(node.frontmatter.date);
            // }

            if (node.frontmatter.categories) {
                if (typeof node.frontmatter.categories === 'string') {
                    node.frontmatter.categories = [
                        node.frontmatter.categories.toLowerCase(),
                    ];
                } else if (Array.isArray(node.frontmatter.categories)) {
                    node.frontmatter.categories =
                        node.frontmatter.categories.map((category) =>
                            category.toLowerCase()
                        );
                }
            }

            return node;
        };

        const newSlug = rewriteSlug(slug);
        const newNode = rewriteNode(node);

        createNodeField({
            name: `slug`,
            node: newNode,
            value: newSlug,
        });
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes, createFieldExtension } = actions;

    createFieldExtension({
        name: 'lowerCase',
        extend: () => ({
            resolver(source, args, context, info) {
                if (Array.isArray(source[info.fieldName])) {
                    return source[info.fieldName].map((item) =>
                        String(item).toLowerCase()
                    );
                } else if (typeof source[info.fieldName] === 'string') {
                    return String(source[info.fieldName]).toLowerCase();
                } else {
                    return source[info.fieldName];
                }
            },
        }),
    });

    createFieldExtension({
        name: 'kebabCase',
        extend: () => ({
            resolver(source, args, context, info) {
                if (Array.isArray(source[info.fieldName])) {
                    return source[info.fieldName].map((item) =>
                        kebabCase(String(item))
                    );
                } else if (typeof source[info.fieldName] === 'string') {
                    return kebabCase(String(source[info.fieldName]));
                } else {
                    return source[info.fieldName];
                }
            },
        }),
    });

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
      location: String
      description: String
    }

    type Social {
      twitter: String
      github: String
      linkedin: String
      facebook: String
      resume: String
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
      categories: [String!] @kebabCase 
      tags: [String!] @kebabCase
      github: GitHub
    }

    type Fields {
      slug: String
    }
  `);
};

// exports.createResolvers = ({ createResolvers }) => {
//     const resolvers = {
//     }
//     createResolvers(resolvers)
// }
