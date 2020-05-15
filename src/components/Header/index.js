import React from "react";

import styles from "./index.module.scss";

export default function (props) {
  return <header className={styles.header}>{props.children}</header>;
}
