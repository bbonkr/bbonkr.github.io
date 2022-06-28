// import { GatsbyConfig } from 'gatsby';
// import type { MarkdownRemarks, Site } from './src/models/data';

const isProductionStage = () => process.env.NODE_ENV === 'production';
// @ts-check
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `<bbon />`,
        siteUrl: 'https://bbon.me',
        author: {
            name: `Pon Cheol Ku (구본철)`,
            summary: 'Software developer',
            location: 'South Korea',
            description:
                'If you want to contact me, please send message comfortably where click below social icon link.',
        },
        description: `Welcome to visit <bbon /> Blog that wrote interested topic and experience, opinions.`,
        social: {
            twitter: 'bbonkr',
            github: 'bbonkr',
            linkedin: 'bbonkr',
            facebook: 'bbonkr',
            resume: 'https://resume.bbon.me',
        },
        seo: {
            facebookAppId: process.env.FB_APP_ID,
            naverSiteVerification: process.env.NAVER_SITE_VERIFICATION,
        },
    },
    graphqlTypegen: true,
    trailingSlash: 'never',
    // flags: {
    //     LMDB_STORE: true,
    // },
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/content/posts`,
            },
        },

        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                // Footnotes mode (default: true)
                footnotes: true,
                // GitHub Flavored Markdown mode (default: true)
                gfm: true,
                // Plugins configs
                plugins: [
                    // build stuck
{
    resolve: `gatsby-remark-images`,
    options: {
        maxWidth: 630,
        // maxWidth: 5000,
        withWebp: true,
        showCaptions: true,
        quality: 100,
    },
},
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            showLineNumbers: false,
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        {
            resolve: `gatsby-plugin-gtag`,
            options: {
                // your google analytics tracking id
                trackingId: process.env.GA_ID || 'Google analytics tacking id',
                // Puts tracking script in the head instead of the body
                head: false,
                // enable ip anonymization
                anonymize: true,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) =>
                            // : {
                            // query: {
                            //     site: Site,
                            //     allMarkdownRemark: MarkdownRemarks,
                            // },
                            // }
                            {
                                return allMarkdownRemark?.edges?.map((edge) => {
                                    const node = edge.node;
                                    return Object.assign({}, node.frontmatter, {
                                        description: node.excerpt,
                                        date: node.frontmatter.date,
                                        url:
                                            site?.siteMetadata?.siteUrl +
                                            node.fields.slug,
                                        guid:
                                            site?.siteMetadata?.siteUrl +
                                            node.fields.slug,
                                        custom_elements: [
                                            { 'content:encoded': node.html },
                                        ],
                                    });
                                });
                            },
                        query: `
{
    site {
    siteMetadata {
      siteUrl
      title
    }
  }
  allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      ${
          // If NODE_ENV is production, excludes draft content.
          isProductionStage()
              ? 'filter: { frontmatter: { draft: { ne: true } } }'
              : ''
      }
      ) {
    edges {
      node {
        excerpt
        html
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
}

            `,
                        output: '/rss.xml',
                        title: '<bbon /> RSS Feed',
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `<bbon />`,
                short_name: `bbon`,
                start_url: `/`,
                background_color: `#ffffff`,
                // This will impact how browsers show your PWA/website
                // https://css-tricks.com/meta-theme-color-and-trickery/
                // theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `static/images/logo.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-react-helmet`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
        `gatsby-plugin-postcss`,
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                query: `
{
    site {
    siteMetadata {
      siteUrl
      title
    }
  }
  allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      ${
          // If NODE_ENV is production, excludes draft content.
          isProductionStage()
              ? 'filter: { frontmatter: { draft: { ne: true } } }'
              : ''
      }
      ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date
        }
      }
    }
  }
}
      `,
                resolvePages: ({ allMarkdownRemark: { edges } }) =>
                    // : {
                    // allMarkdownRemark: MarkdownRemarks,
                    // }
                    {
                        return edges?.map((edge) => {
                            return {
                                path: edge.node.fields.slug,
                                modifiedGmt: edge.node.frontmatter.date,
                            };
                        });
                    },
                serialize: ({ path, modifiedGmt }) =>
                    // : {
                    // path: string,
                    // modifiedGmt: Date,
                    // }
                    {
                        return {
                            url: path,
                            lastmod: modifiedGmt,
                        };
                    },
            },
        },
    ],
};

exports;
