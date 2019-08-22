import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";

import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Post from "../components/Post";

class PageTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.markdownRemark");
    let postTypeMatch = post.fields.slug.match(/(\/)?(.*?)(\/)/);
    const type = !postTypeMatch ? "" : postTypeMatch[0].replace(/\//g, "");

    return (
      <Layout>
        <SEO
          postPath={post.fields.slug}
          postNode={post}
          postSEO={type === "posts"}
        />
        <Post
          data={post.frontmatter}
          content={post.html}
          isPage={type !== "posts"}
          shortBio={this.props.data.site.siteMetadata.shortBio}
          url={
            this.props.data.site.siteMetadata.siteUrl +
            this.props.location.pathname
          }
        />
      </Layout>
    );
  }
}

export default PageTemplate;

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
        last_updated(formatString: "MMMM DD, YYYY")
        open_graph
      }
    }
  }
`;
