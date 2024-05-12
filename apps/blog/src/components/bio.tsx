/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

interface Author {
  name: string;
  summary?: string;
}

interface Social {
  twitter?: string;
}

interface SiteMetadata {
  author?: Author;
  social?: Social;
}

interface BioQuery {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const Bio: React.FC = () => {
  const data = useStaticQuery<BioQuery>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.ts
  const author = data.site.siteMetadata.author;
  const social = data.site.siteMetadata.social;

  return (
    <div className="bio">
      <StaticImage
        alt="Profile picture"
        className="bio-avatar"
        formats={["auto", "webp", "avif"]}
        height={50}
        layout="fixed"
        quality={95}
        src="../images/profile-pic.jpg"
        width={50}
      />
      {author?.name ? (
        <p>
          Written by <strong>{author.name}</strong> {author.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a>
        </p>
      ) : null}
    </div>
  );
};

export default Bio;
