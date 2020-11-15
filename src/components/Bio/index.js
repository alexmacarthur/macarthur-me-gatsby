import React from "react";
import styles from "./index.module.scss";
import pic from "./bio.jpg";

const Bio = ({ content }) => {
  return (
    <aside className={styles.bio}>
      <img className={styles.image} src={pic} alt="Alex's Headshot" />
      <p className={styles.content}>{content}</p>
    </aside>
  );
};

export default Bio;
