/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import path from "node:path";
import type {
  GatsbyNode,
  // Actions,
  CreateNodeArgs,
  CreatePagesArgs,
  CreateSchemaCustomizationArgs,
} from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createPage, createRedirect } = actions;

  // ## New Method
  const result = await graphql<{
    allMdx: {
      nodes: {
        id: string;
        excerpt: string;
        frontmatter: {
          date: string;
          title: string;
          slug: string;
          description: string;
          language: string;
        };
      }[];
    };
  }>(`
    {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
            description
            language
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data?.allMdx.nodes ?? [];

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  console.log(`===Creating ${posts.length} blog posts`);

  if (posts.length > 0) {
    posts.forEach(({ frontmatter: { slug, language }, id }, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: `/${language}/blog/${slug}`,
        component: blogPost,
        context: {
          id,
          previousPostId,
          nextPostId,
        },
      });
    });

    // Redirect root to /en
    createRedirect({
      fromPath: "/",
      toPath: "/en",
      isPermanent: true,
      redirectInBrowser: true,
    });
  }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}: CreateNodeArgs) => {
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

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }: CreateSchemaCustomizationArgs) => {
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
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
  };
