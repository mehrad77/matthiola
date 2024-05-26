/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Link, graphql } from "gatsby";
// import { Button } from "@repo/ui/button";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogIndex = ({ data, location }: Record<string, any>) => {
  console.log(`=======BlogIndex data`, data);
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMdx.nodes ?? [];

  console.log(`======= Length of posts`, posts.length);
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to &ldquo;content/blog&rdquo;
          (or the directory you specified for the
          &ldquo;gatsby-source-filesystem&rdquo; plugin in gatsby-config.ts).
        </p>
        <Bio />
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ listStyle: `none` }}>
        {posts?.map((post: any) => {
          const { frontmatter } = post;
          const title = frontmatter.title || frontmatter.slug;
          const link = `blog/${frontmatter.slug}`;
          console.log(`=======frontmatter`, frontmatter);
          console.log(`URL =>`, link);
          return (
            <li key={frontmatter.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={link} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
      <br />
      <br />
      <br />
      <Bio />
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  query ($language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
          language
          description
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
