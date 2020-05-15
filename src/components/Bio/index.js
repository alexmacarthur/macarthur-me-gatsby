import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";
import pic from "./bio.jpg";

class Bio extends React.Component {
  render() {
    return (
      <aside className={styles.bio}>
        <img className={styles.image} src={pic} alt="" />
        <p className={styles.content}>{this.props.content}</p>
      </aside>
    );
  }
}

Bio.propTypes = {
  route: PropTypes.object,
};

export default Bio;
