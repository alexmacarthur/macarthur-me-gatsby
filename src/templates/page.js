import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import SEO from "../components/SEO"
import Post from '../components/Post'

class PageTemplate extends React.Component {
  render() {

    const post = get(this.props, 'data.markdownRemark');
    const title = `${post.frontmatter.title} | ${get(this.props, 'data.site.siteMetadata.author')}`;

    let type = post.fields.slug.includes('/posts/')
      ? 'post'
      : 'page';

    return <div>
        <SEO postPath={post.fields.slug} postNode={post} postSEO={type === 'post'} />
        <Post data={post.frontmatter} content={post.html} type={type} shortBio={this.props.data.site.siteMetadata.shortBio} url={this.props.data.site.siteMetadata.siteUrl + this.props.location.pathname} />
      </div>;
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        author
        shortBio
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        open_graph
      }
    }
  }
`
