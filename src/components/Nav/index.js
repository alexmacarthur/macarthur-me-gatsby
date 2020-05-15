import React from "react";
import Link from "gatsby-link";

import styles from "./index.module.scss";

const Nav = function ({ isLandingNav = false }) {
  const links = [
    {
      name: "Posts",
      path: "/posts",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Home",
      path: "/",
    },
  ];

  return (
    <nav
      className={styles.nav + " " + (isLandingNav ? styles.nav__landing : "")}
    >
      {!isLandingNav && (
        <div className={styles.logo}>
          <Link className={styles.logo} to="/">
            Alex MacArthur
          </Link>
        </div>
      )}

      {!isLandingNav && (
        <>
          <input className={styles.menuCheckbox} type="checkbox" />

          <ul className={styles.menuIcon}>
            <li className={styles.menuIconBar}></li>
            <li className={styles.menuIconBar}></li>
            <li className={styles.menuIconBar}></li>
          </ul>
        </>
      )}

      <div className={styles.listWrapper}>
        <div className={styles.shade}></div>
        <ul
          className={`
          ${styles.list}
        `}
        >
          {links.map((item) => {
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
    </nav>
  );
};

export default Nav;
