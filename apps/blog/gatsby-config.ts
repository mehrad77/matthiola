/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { GatsbyConfig } from "gatsby";
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
const config: GatsbyConfig = {
  siteMetadata: {
    title: `Shab Boo`,
    author: {
      name: `Mehrad Rousta`,
      summary: `Who dreams, lives, loves, learns, laughs, and creates.`,
    },
    description: `A place to write and keep my stuff.`,
    siteUrl: `https://shab.boo`,
    social: {
      twitter: `mehrad4U`,
    },
  },
  // graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`@repo/ui`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `en_blog`,
        path: `${__dirname}/content/en/blog`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `fa_blog`,
    //     path: `${__dirname}/content/fa/blog`,
    //   },
    // },
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
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // Name of the source plugin (default value)
        languages: [`en`, `fa`],
        defaultLanguage: `en`,
        siteUrl: `https://shab.boo`,
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({
    //           query: { site, allMarkdownRemark },
    //         }: {
    //           query: {
    //             site: Record<string, any>;
    //             allMarkdownRemark: { nodes: Record<string, any>[] };
    //           };
    //         }) => {
    //           return allMarkdownRemark.nodes.map(node => {
    //             return {
    //               ...node.frontmatter,
    //               description: node.excerpt,
    //               date: node.frontmatter.date,
    //               url: site.siteMetadata.siteUrl + node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + node.fields.slug,
    //               custom_elements: [{ "content:encoded": node.html }],
    //             };
    //           });
    //         },
    //         query: `{
    //           allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    //             nodes {
    //               excerpt
    //               html
    //               fields {
    //                 slug
    //               }
    //               frontmatter {
    //                 title
    //                 date
    //               }
    //             }
    //           }
    //         }`,
    //         output: "/rss.xml",
    //         title: "Shab Boo RSS Feed",
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Shab Boo`,
        short_name: `Shab.Boo`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-postcss",
  ],
};

export default config;
