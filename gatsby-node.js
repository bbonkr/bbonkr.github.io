// import type { Actions, GatsbyNode, Node, Page, Reporter } from 'gatsby';
// import { MarkdownRemark, MarkdownRemarks } from './src/models/data';
// import { createFilePath } from 'gatsby-source-filesystem';
// import kebabCase from 'lodash/kebabCase';
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const kebabCase = require('lodash/kebabCase');

const isProductionStage = () => process.env.NODE_ENV === 'production';

// type AllPosts = MarkdownRemarks;
// type CategoryGroups = {
//     group: {
//         fieldValue?: string;
//         totalCount?: number;
//         edges: {
//             node: MarkdownRemark;
//         }[];
//     }[];
// };
// type TagGroups = {
//     group: {
//         fieldValue?: string;
//         totlaCount?: number;
//         edges: {
//             node: MarkdownRemark;
//         }[];
//     }[];
// };

const createPostPages = (
    // actions: Actions,
    // reporter: Reporter,
    // allPosts?: AllPosts
    actions,
    reporter,
    allPosts
) => {
    const { createPage } = actions;
    const tempalte = path.resolve(`./src/templates/blog-post.tsx`);
    // const tempalte = require.resolve(`./src/templates/blog-post.tsx`);

    const edges = allPosts?.edges;

    if ((edges?.length ?? 0) > 0) {
        edges?.forEach((item, index) => {
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

const createTagPages = (
    // actions: Actions,
    // reporter: Reporter,
    // tagGroups?: TagGroups
    actions,
    reporter,
    tagGroups
) => {
    const { createPage } = actions;
    const template = path.resolve(`./src/templates/tags.tsx`);
    // const template = require.resolve(`./src/templates/tags.tsx`);

    const tags = tagGroups?.group;

    if (typeof tags !== 'undefined' && tags.length > 0) {
        tags?.forEach((item) => {
            if (typeof item !== 'undefined' && item.fieldValue) {
                const postsPerPage = 6;
                const posts = item.edges;
                const totalPages = Math.ceil(posts.length / postsPerPage);
                Array.from({ length: totalPages })
                    .fill(0)
                    .forEach((_, index) => {
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

const createCategoryPages = (
    // actions: Actions,
    // reporter: Reporter,
    // categoryGroups?: CategoryGroups
    actions,
    reporter,
    categoryGroups
) => {
    const { createPage } = actions;
    const template = path.resolve(`./src/templates/categories.tsx`);
    // const template = require.resolve(`./src/templates/categories.tsx`);

    const categories = categoryGroups?.group;

    if (typeof categories !== 'undefined' && categories.length > 0) {
        categories?.forEach((item) => {
            const postsPerPage = 6;
            const posts = item.edges;
            const totalPages = Math.ceil(posts.length / postsPerPage);

            if (typeof item !== 'undefined' && item.fieldValue) {
                Array.from({ length: totalPages })
                    .fill(0)
                    .forEach((_, index) => {
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

const createBlogListPages = (
    // actions: Actions,
    // reporter: Reporter,
    // allPosts?: AllPosts
    actions,
    reporter,
    allPosts
) => {
    const { createPage } = actions;
    const template = path.resolve(`./src/templates/blog-list.tsx`);
    // const template = require.resolve(`./src/templates/blog-list.tsx`);

    const postsPerPage = 6;
    const posts = allPosts?.edges;
    const totalPages = Math.ceil((posts?.length ?? 0) / postsPerPage);

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

// @ts-check
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
    const isProd = isProductionStage();

    // Define a template for blog post

    // Get all markdown blog posts sorted by date

    // <{
    //     allPosts: AllPosts;
    //     categoryGroups: CategoryGroups;
    //     tagGroups: TagGroups;
    // }>

    const result = await graphql(
        `
            {
                allPosts: allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: ASC }
                    ${
                        // If NODE_ENV is production, excludes draft content.
                        isProd
                            ? 'filter: {frontmatter: {draft: {ne: true}}}'
                            : ''
                    }
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

                categoryGroups: allMarkdownRemark(
                    ${
                        // If NODE_ENV is production, excludes draft content.
                        isProd
                            ? 'filter: {frontmatter: {draft: {ne: true}}}'
                            : ''
                    }
                    limit: 2000) {
                    group(
                        field: frontmatter___categories
                        ) {
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

                tagGroups: allMarkdownRemark(
                    ${
                        // If NODE_ENV is production, excludes draft content.
                        isProd
                            ? 'filter: {frontmatter: {draft: {ne: true}}}'
                            : ''
                    }
                    limit: 2000) {
                    group(
                        field: frontmatter___tags
                        ) {
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

        throw result.errors;
    }

    try {
        createPostPages(actions, reporter, result?.data?.allPosts);

        createTagPages(actions, reporter, result?.data?.tagGroups);

        createCategoryPages(actions, reporter, result?.data?.categoryGroups);

        createBlogListPages(actions, reporter, result?.data?.allPosts);
    } catch (e) {
        throw e;
    }
};

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
    const frontmatter = node['frontmatter'];
    const tags = frontmatter?.tags;
    const categories = frontmatter?.categories;

    if (tags) {
        if (typeof tags === 'string') {
            // if tags is string, set array with tags string
            node['frontmatter'] = {
                ...frontmatter,
                tags: [tags.toLowerCase()],
            };
        } else if (Array.isArray(tags)) {
            // lowercase

            node['frontmatter'] = {
                ...frontmatter,
                tags: tags.map((tag) => tag?.toLowerCase() ?? 'no-tag'),
            };
        }
    } else {
        node['frontmatter'] = {
            ...frontmatter,
            tags: ['no-tag'],
        };
    }

    if (categories) {
        if (typeof categories === 'string') {
            node['frontmatter'] = {
                ...frontmatter,
                categories: [categories.toLowerCase()],
            };
        } else if (Array.isArray(categories)) {
            if (categories.filter((x) => Boolean).length === 0) {
                // If categories are empty string, set uncategorized as categories
                node['frontmatter'] = {
                    ...frontmatter,
                    categories: ['uncategorized'],
                };
            } else {
                node['frontmatter'] = {
                    ...frontmatter,
                    categories: categories.map(
                        (category) => category?.toLowerCase() ?? 'uncategorized'
                    ),
                };
            }
        }
    } else {
        node['frontmatter'] = {
            ...frontmatter,
            categories: ['uncategorized'],
        };
    }

    return node;
};

// @ts-check
/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
    // onCreateNode -> sourceNodes
    const { createNodeField } = actions;
    const isProd = isProductionStage();

    const nodeActual = node; // as Node;

    if (nodeActual?.internal?.type === `MarkdownRemark`) {
        const slug = createFilePath({
            node: nodeActual,
            getNode,
            // basePath: `posts`,
        });

        const newSlug = rewriteSlug(slug);
        const newNode = rewriteNode(nodeActual);

        if (newSlug) {
            createNodeField({
                name: `slug`,
                node: nodeActual,
                value: newSlug,
            });
        }
    }
};

// @ts-check
/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
    // : GatsbyNode['createSchemaCustomization'] =
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
    const siteMatadataType = `type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
      seo: Seo
    }`;
    const authorType = `type Author {
      name: String
      summary: String
      location: String
      description: String
    }`;
    const socialType = `type Social {
      twitter: String
      github: String
      linkedin: String
      facebook: String
      resume: String
    }`;
    const seoType = `type Seo {
        facebookAppId: String
        naverSiteVerification: String
    }`;
    const markdownRemarkType = `type MarkdownRemark implements Node @infer {
      frontmatter: Frontmatter
      fields: Fields
    }`;
    const githubType = `type GitHub {
        owner: String
        repo: String
    }`;
    const frontmatterType = `type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      categories: [String!] @kebabCase 
      tags: [String!] @kebabCase
      github: GitHub
      draft: Boolean
      comments: Boolean
    }`;

    const featuredImageType = `type FeaturedImage {
  childImageSharp: ImageSharp
}`;

    const frontmatterObjectType = schema.buildObjectType({
        name: 'Frontmatter',
        extensions: {
            infer: false,
        },
        fields: {
            title: {
                type: 'String',
                // resolve: (
                //     source: any,
                //     args: any,
                //     context: any,
                //     info: any
                // ) => source.title,
            },
            description: {
                type: 'String',
                // resolve: (
                //     source: any,
                //     args: any,
                //     context: any,
                //     info: any
                // ) => source.description,
            },
            date: {
                type: 'Date', // @dateformat
                extensions: {
                    dateformat: {},
                },
                // resolve: (
                //     source: any,
                //     args: any,
                //     context: any,
                //     info: any
                // ) => source.date,
            },
            categories: {
                type: '[String!]',
                extensions: {
                    infer: false,
                },
                resolve: (source, args, context, info) => {
                    const items = source.categories;
                    if (typeof items === 'string') {
                        return [kebabCase(items.toLowerCase())];
                    } else if (Array.isArray(items)) {
                        if (items.length === 0) {
                            return ['uncategorized'];
                        } else {
                            return items.map((item) =>
                                kebabCase(item.toLowerCase())
                            );
                        }
                    } else {
                        return ['uncategorized'];
                    }
                },
            },
            tags: {
                type: '[String!]',
                extensions: {
                    infer: false,
                },
                resolve: (source, args, context, info) => {
                    const items = source.tags;
                    if (typeof items === 'string') {
                        return [kebabCase(items.toLowerCase())];
                    } else if (Array.isArray(items)) {
                        if (items.length === 0) {
                            return ['untaged'];
                        } else {
                            return items.map((item) =>
                                kebabCase(item.toLowerCase())
                            );
                        }
                    } else {
                        return ['untaged'];
                    }
                },
            },
            github: {
                type: 'GitHub',
                // resolve: (
                //     source: any,
                //     args: any,
                //     context: any,
                //     info: any
                // ) => {
                //     if (source.github) {
                //         return {
                //             owner: source.github.owner,
                //             repo: source.github.repo,
                //         };
                //     }
                //     return null;
                // },
            },
            draft: {
                type: 'Boolean',
            },
            comments: {
                type: 'Boolean',
            },
            featuredImage: {
                type: 'FeaturedImage',
            },
        },
    });
    const fieldType = `type Fields {
      slug: String!
    }`;

    createTypes([
        fieldType,
        authorType,
        socialType,
        seoType,
        githubType,
        // childImageType,
        featuredImageType,
        // frontmatterObjectType,
        frontmatterType,
        siteMatadataType,
        markdownRemarkType,
    ]);
};

// exports.createResolvers = ({ createResolvers }) => {
//     const resolvers = {
//     }
//     createResolvers(resolvers)
// }
