import React from "react";

import styles from "./index.module.scss";

export default ({ isOpen = false, onClick }) => {
  return (
    <ul
      onClick={onClick}
      className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`}
    >
      <li className={styles.bar}></li>
      <li className={styles.bar}></li>
      <li className={styles.bar}></li>
    </ul>
  );
};
