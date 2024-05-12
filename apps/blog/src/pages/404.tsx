import * as React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

interface SiteMetadata {
  title: string;
}

interface SiteData {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const NotFoundPage: React.FC<PageProps<SiteData>> = ({ data, location }) => {
  const siteTitle: string = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export const Head: React.FC = () => <Seo title="404: Not Found" />;

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
