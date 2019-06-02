import React from "react";

import styles from "./index.module.scss";

export default () => {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        &copy; Alex MacArthur | {date.getFullYear()}
      </span>
    </footer>
  );
};
