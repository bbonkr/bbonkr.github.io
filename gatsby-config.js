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
        description: `A starter blog demonstrating what Gatsby can do.`,
        social: {
            twitter: 'bbonkr',
            github: 'bbonkr',
            linkedin: 'bbonkr',
            facebook: 'bbonkr',
            resume: 'https://resume.bbon.me',
        },
    },
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        `gatsby-plugin-image`,
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
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                // Footnotes mode (default: true)
                footnotes: true,
                // GitHub Flavored Markdown mode (default: true)
                gfm: true,
                // Plugins configs
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630,
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
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GA_ID,
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
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map((edge) => {
                                const node = edge.node;
                                return Object.assign({}, node.frontmatter, {
                                    description: node.excerpt,
                                    date: node.frontmatter.date,
                                    url:
                                        site.siteMetadata.siteUrl +
                                        node.fields.slug,
                                    guid:
                                        site.siteMetadata.siteUrl +
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
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
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
        `gatsby-plugin-sitemap`,
    ],
};
