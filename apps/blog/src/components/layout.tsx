import * as React from "react";
import { Link } from "gatsby";
import Header from "./header";
import HeroSection from "./hero";

interface LayoutProps {
  location: Location;
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const rootPath = `/en`;
  const isRootPath =
    location.pathname === rootPath || location.pathname === `${rootPath}/`;
  let header: React.ReactNode;
  let hero: React.ReactNode;

  if (isRootPath) {
    header = <Header title={title} />;
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
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
