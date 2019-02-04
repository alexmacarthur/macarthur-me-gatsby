import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Card from '../../components/Card'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import HeaderBar from '../../components/HeaderBar'

class PostList extends React.Component {

  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const pageContext = get(this, 'props.pageContext')

    return (
      <Layout>
        <div>
          <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />

          <HeaderBar>
            <h1
              style={{
                margin: 0
              }}
            >Posts</h1>
            <Pagination
              pageContext={pageContext}
              slim={true}
            />
          </HeaderBar>
          
          { posts.map(({ node }) => {

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

        <Pagination pageContext={pageContext}/>
      </Layout>
    )
  }
}

PostList.propTypes = {
  route: PropTypes.object,
}

export default PostList

export const postsQuery = graphql`
  query PostsQuery($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip, 
      filter: {fileAbsolutePath: {regex: "/(\/pages\/posts)/(.*).md$/"}}
    ) {
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
