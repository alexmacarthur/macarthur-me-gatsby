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
    const publishDate =
      post.fields.publishDate === "Invalid date"
        ? null
        : post.fields.publishDate;

    return (
      <Layout>
        <SEO
          postPath={post.fields.slug}
          postNode={post}
          postSEO={type === "posts"}
        />
        <Post
          data={post.frontmatter}
          publishDate={publishDate}
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
        publishDate(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        title
        subtitle
        last_updated(formatString: "MMMM DD, YYYY")
        open_graph
      }
    }
  }
`;
