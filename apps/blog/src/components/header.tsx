/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-leaked-render */
import React from "react";
import { Link } from "gatsby";

interface HeaderProps {
  title: string;
  hasSubHeading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, hasSubHeading = true }) => {
  return (
    <>
      <header id="header">
        <div className="header-site">
          <div className="site-title-wrapper">
            <h1 className="site-title">
              <Link to="/">{title}</Link>
            </h1>
          </div>
          <div className="quick-nav">
            <nav>
              <div>
                <Link to="/about">About</Link>
              </div>
              <div>
                <Link to="/xp">Experiences</Link>
              </div>
              <div>
                <Link to="/pages">Pages</Link>
              </div>
            </nav>
          </div>
        </div>
        <div className="header-language-selector">
          <ul>
            <li>
              <a href="#">fa</a>
            </li>
            <li>
              <a href="#">en</a>
            </li>
          </ul>
        </div>
      </header>
      {hasSubHeading && (
        <div id="subheader">
          <div className="">
            <div className="subheader-categories">
              <div className="inline-flex" role="group">
                <div className="chip parent-chip black-chip rounded-full">
                  <Link to="/blog">Blog Posts </Link>
                  <span className="chip child-chip child-chip-start bg-stone-300 text-neutral-900">
                    <Link to="/blog/tech">Tech</Link>
                  </span>
                  <span className="chip child-chip child-chip-middle bg-blue-300 text-neutral-900 ">
                    <Link to="/blog/music">Music</Link>
                  </span>
                  <span className="chip child-chip child-chip-end bg-red-300 text-neutral-900">
                    <Link to="/blog/daily">Daily</Link>
                  </span>
                </div>
              </div>
              <div className="hidden md:inline-flex" role="group">
                <div className="chip black-chip ms-2 px-2 py-2 rounded-full">
                  <Link to="/stream">stream of consciousness</Link>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="subheader-stream border-l-2 px-4 py-2 w-32">
            <span>stream...</span>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Header;
