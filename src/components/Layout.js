import React from "react";
import PropTypes from "prop-types";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <SEO />

        <Nav isTop={true} type="short" />

        <main>{children}</main>

        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  route: PropTypes.object
};

export default Layout;
