import React, { useState } from "react";
import Link from "gatsby-link";
import MenuIcon from "../MenuIcon";

import styles from "./index.module.scss";

const Nav = function({ isLandingNav = false }) {
  let [isOpen, setIsOpen] = useState(false);

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
    },
    {
      name: "Home",
      path: "/"
    }
  ];

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

      <div className={styles.listWrapper}>
        <div
          className={`${styles.shade} ${isOpen ? styles.shadeIsOpen : ""}`}
        ></div>
        <ul
          className={`
          ${styles.list}
        `}
        >
          {links.map(item => {
            let isHomeLink = item.path === "/";

            if (isLandingNav && isHomeLink) {
              return null;
            }

            return (
              <li
                className={`${styles.item} ${isHomeLink ? styles.isHome : ""}`}
                key={item.path}
              >
                <Link className={styles.link} to={item.path}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {!isLandingNav && (
        <>
          <MenuIcon
            isOpen={isOpen}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </>
      )}
    </nav>
  );
};

export default Nav;
