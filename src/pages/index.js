import { graphql } from "gatsby";
import React from "react";
import PropTypes from "prop-types";
import SEO from "../components/SEO";

import Hero from "../components/Hero";

class BlogIndex extends React.Component {
  render() {
    return (
      <>
        <SEO />
        <Hero />
      </>
    );
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
