import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Hero from '../components/Hero'

class BlogIndex extends React.Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>{get(this, 'props.data.site.siteMetadata.title')}</title>
          <meta name="description" content={get(this, 'props.data.site.siteMetadata.description')} />
        </Helmet>

        <Hero />
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
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
