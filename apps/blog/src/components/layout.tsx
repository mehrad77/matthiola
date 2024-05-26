import * as React from "react";
import { Link } from "gatsby";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import Header from "./header";
import HeroSection from "./hero";

interface LayoutProps {
  location: Location;
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const { t } = useTranslation();

  const rootPaths = ["/en", "/fa", "/en/", "/fa/"];
  const isRootPath = rootPaths.includes(location.pathname);
  let header: React.ReactNode;
  let hero: React.ReactNode;

  if (isRootPath) {
    header = <Header title={t(title)} />;
    hero = <HeroSection />;
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      {header}

      <main className="content-wrapper">
        {hero}
        {children}
      </main>
      <footer>
        ɔ {new Date().getFullYear()}, <Trans>Built with</Trans>
        {` `}
        <a href="https://www.gatsbyjs.com">
          <Trans>Gatsby</Trans>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
