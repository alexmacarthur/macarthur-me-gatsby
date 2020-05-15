import React from "react";

import styles from "./index.module.scss";

const HeaderBar = (props) => {
  return (
    <>
      <div className={`${styles.bar} ${props.isStacked ? styles.stacked : ""}`}>
        {props.children}
      </div>

      {props.description && (
        <div className={styles.description}>
          <p>{props.description}</p>
        </div>
      )}
    </>
  );
};

HeaderBar.defaultProps = {
  isStacked: false,
};

export default HeaderBar;
