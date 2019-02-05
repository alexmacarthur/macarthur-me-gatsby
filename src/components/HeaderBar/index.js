import React from "react";

import "./index.scss";

const HeaderBar = props => {
  return (
    <>
      <div
        className={"HeaderBar" + (props.isStacked ? " HeaderBar--stacked" : "")}
      >
        {props.children}
      </div>

      {props.description && (
        <div className="HeaderBar-description">
          <p>{props.description}</p>
        </div>
      )}
    </>
  );
};

HeaderBar.defaultProps = {
  isStacked: false
};

export default HeaderBar;
