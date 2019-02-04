import React from "react";
import PropTypes from "prop-types";

import "./index.scss";
import pic from "./bio.jpg";

class Bio extends React.Component {
  render() {
    return (
      <aside className="Bio">
        <img className="Bio-image" src={pic} alt="" />
        <p className="Bio-content">{this.props.content}</p>
      </aside>
    );
  }
}

Bio.propTypes = {
  route: PropTypes.object
};

export default Bio;
