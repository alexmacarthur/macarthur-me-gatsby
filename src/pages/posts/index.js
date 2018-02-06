import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Card from '../../components/Card'

import '../../../assets/scss/style.scss';

class PostList extends React.Component {

  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    const filteredPosts = posts.filter((post) => {
      if(!post.node.fields.slug.startsWith('/posts/')) return false;
      return true;
    });

    return (

        <div>
          <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />

          <h1>Posts</h1>

          { filteredPosts.map(({ node }) => {
              const title = node.frontmatter.title || node.slug

              return (
                <Card
                  key={node.fields.slug}
                  title={node.frontmatter.title}
                  path={node.fields.slug}
                  date={node.frontmatter.date}
                  postExcerpt={node.excerpt}
                />
              )
          }) }
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
