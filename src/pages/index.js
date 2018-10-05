import { graphql } from 'gatsby'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import SEO from "../components/SEO"

import Hero from '../components/Hero'
import Banner from '../components/Banner'

class BlogIndex extends React.Component {

  render() {
    return (
      <Fragment>
        <SEO />
        <Banner isAbsolute={true} />
        <Hero />
      </Fragment>
    )
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
