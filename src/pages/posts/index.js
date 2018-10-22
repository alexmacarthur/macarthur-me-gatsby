import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Card from '../../components/Card'
import Layout from '../../components/Layout'

class PostList extends React.Component {

  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    const filteredPosts = posts.filter((post) => {
      if(!post.node.fields.slug.startsWith('/posts/')) return false;
      return true;
    });

    return (
      <Layout>
        <div>
          <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />

          <h1>Posts</h1>

          { filteredPosts.map(({ node }) => {

              let link = node.frontmatter.external 
                ? node.frontmatter.external
                : node.fields.slug;

              return (
                <Card
                  key={link}
                  title={node.frontmatter.title}
                  path={link}
                  date={node.frontmatter.date}
                  postExcerpt={node.excerpt}
                  external={node.frontmatter.external}
                />
              )
          }) }
        </div>
      </Layout>
    )
  }
}

PostList.propTypes = {
  route: PropTypes.object,
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
            title,
            external
          }
        }
      }
    }
  }
`
