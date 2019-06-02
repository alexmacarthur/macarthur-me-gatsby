import React from "react";
import Nav from "../Nav";
import SocialIcons from "../SocialIcons";

import styles from "./index.module.scss";

class Hero extends React.Component {
  render() {
    return (
      <div className={styles.hero}>
        <div className={styles.wrapper}>
          <div>
            <h1 className={styles.title}>
              I'm <strong>Alex MacArthur</strong>, <br />a web developer in{" "}
              <span>Nashville-ish, TN.</span>
            </h1>

            <div className={styles.bottomWrapper}>
              <SocialIcons newTab={true} />
            </div>
          </div>
          <Nav isLandingNav={true} />
        </div>
      </div>
    );
  }
}

export default Hero;
