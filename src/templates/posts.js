import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Layout from "../components/Layout";
import PostList from "../components/PostList";

const PostsPage = (props) => {
  return (
    <Layout>
      <Helmet title={props.data.site.siteMetadata.title} />
      <PostList
        pageContext={props.pageContext}
        description={props.data.site.siteMetadata.pageDescriptions.posts}
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
  }
`;
