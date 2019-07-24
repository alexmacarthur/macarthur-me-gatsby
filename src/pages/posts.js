import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import PostList from "../components/PostList";

const PostsPage = ({ data }) => {
  return (
    <Layout>
      <Helmet title={data.site.siteMetadata.title} />
      <PostList
        edges={data.allMarkdownRemark.edges}
        description={data.site.siteMetadata.pageDescriptions.posts}
        title="Posts"
      />
    </Layout>
  );
};

export default PostsPage;

export const postsQuery = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
        pageDescriptions {
          posts
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
      filter: { fileAbsolutePath: { regex: "/(posts)/(.*).md$/" } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            external
          }
        }
      }
    }
  }
`;
