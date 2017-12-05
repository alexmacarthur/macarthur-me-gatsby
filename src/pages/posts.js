import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Card from '../components/Card'

import '../../assets/scss/style.scss';

class PostList extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (

        <div>
          <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />

          <h1>Posts</h1>

          {posts.map(post => {
            if (post.node.path !== '/404/' && post.node.frontmatter.type !== 'page') {
              const title = get(post, 'node.frontmatter.title') || post.node.path
              return (
                <Card
                  key={post.node.frontmatter.path}
                  title={post.node.frontmatter.title}
                  path={post.node.frontmatter.path}
                  date={post.node.frontmatter.date}
                  postExcerpt={post.node.excerpt}
                />
              )
            }
          })}
        </div>
    )
  }
}

PostList.propTypes = {
  route: React.PropTypes.object,
}

export default PostList

export const postsQuery = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {
      fields: [frontmatter___date],
      order: DESC
    }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            type
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
