import React, { useState, useEffect } from "react";
import Link from "gatsby-link";

import styles from "./index.module.scss";

const Nav = function({ isLandingNav = false }) {
  let [isOpen, setIsOpen] = useState(false);
  let [menuText, setMenuText] = useState("Open Menu");

  const links = [
    {
      name: "Posts",
      path: "/posts"
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

  useEffect(() => {
    setMenuText(isOpen ? "Close Menu" : "Open Menu");
  }, [isOpen]);

  useEffect(() => {
    window.closeNav = () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <nav
      className={
        styles.nav +
        " " +
        (isLandingNav ? styles.nav__landing : "") +
        " " +
        (isOpen ? styles.isOpen : "")
      }
    >
      {!isLandingNav && (
        <div className={styles.logo}>
          <Link className={styles.logo} to="/">
            Alex MacArthur
          </Link>
        </div>
      )}

      <ul
        className={`
        ${styles.list}
      `}
      >
        {links.map(item => {
          return (
            <li className={styles.item} key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>

      {!isLandingNav && (
        <>
          <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
            {menuText}
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
