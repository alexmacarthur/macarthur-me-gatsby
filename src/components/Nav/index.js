import React, { useState, useEffect } from "react";
import Link from "gatsby-link";

import "./index.scss";

const Nav = function({
  type = "short",
  noBackground = false,
  showMobileToggle = true,
  isTop = false
}) {
  let [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      name: "Posts",
      path: "/posts"
    },
    {
      name: "Projects",
      path: "/projects"
    },
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Contact",
      path: "/contact"
    }
  ];

  function openNav() {
    setIsOpen(true);
  }

  function closeNav() {
    setIsOpen(false);
  }

  useEffect(() => {
    window.closeNav = () => {
      closeNav();
    };
  }, []);

  return (
    <nav
      className={
        "Nav" + (isTop ? " Nav--top" : " ") + (isOpen ? " is-open" : " ")
      }
    >
      {isTop && (
        <Link className="Nav-logo" to="/">
          Alex MacArthur
        </Link>
      )}

      <ul className={"Nav-list " + (noBackground ? "no-background" : "")}>
        {links.map(item => {
          return (
            <li className="Nav-item" key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>

      {!!showMobileToggle && (
        <>
          <div className="Nav-close" onClick={closeNav}>
            <svg viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>

          <button className="Nav-toggle" onClick={openNav}>
            Menu
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
