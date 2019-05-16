import React from "react";
import PropTypes from "prop-types";

//-- Components.
import Nav from "../Nav";
import SocialIcons from "../SocialIcons";

//-- Styles.
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
              I'm Alex MacArthur, <br />a web developer in Nashville-ish, TN.
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

Hero.propTypes = {
  route: PropTypes.object
};

export default Hero;
