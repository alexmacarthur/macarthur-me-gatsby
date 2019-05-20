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
            <h1
              className={styles.title}
              id="heroTitle"
              ref={el => {
                this.el = el;
              }}
            >
              I'm <strong>Alex MacArthur</strong>, <br />a web developer in{" "}
              <span>Nashville-ish, TN.</span>
            </h1>

            <div className={styles.bottomWrapper}>
              <SocialIcons newTab={true} />
            </div>
          </div>
          <Nav type="short" noBackground={true} showMobileToggle={false} />
        </div>
      </div>
    );
  }
}

export default Hero;
