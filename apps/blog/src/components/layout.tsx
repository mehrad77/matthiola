import * as React from "react";
import { Link } from "gatsby";
import Header from "./header";

interface LayoutProps {
  location: Location;
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const rootPath = `/`;
  const isRootPath = location.pathname === rootPath;
  let header: React.ReactNode;

  if (isRootPath) {
    header = <Header title={title} />;
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
      <main className="content-wrapper">{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
