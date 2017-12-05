import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Post from '../components/Post'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <Helmet>
          <title>{get(this, 'props.data.site.siteMetadata.title')}</title>
          <meta name="description" content={get(this, 'props.data.site.siteMetadata.description')} />
        </Helmet>

        <Post
          postData={post.frontmatter}
          postContent={post.html}
        />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
