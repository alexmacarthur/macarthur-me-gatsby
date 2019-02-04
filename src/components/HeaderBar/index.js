import React from "react";

import "./index.scss";

const HeaderBar = props => {
  return (
    <div
      className={"HeaderBar" + (props.isStacked ? " HeaderBar--stacked" : "")}
    >
      {props.children}
    </div>
  );
};

HeaderBar.defaultProps = {
  isStacked: false
};

export default HeaderBar;
