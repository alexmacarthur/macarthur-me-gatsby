import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import Layout from "../../components/Layout";
import PostList from "../../components/PostList";

const NotesPage = props => {
  return (
    <Layout>
      <Helmet title={props.data.site.siteMetadata.title} />
      <PostList
        pageContext={props.pageContext}
        description={props.data.site.siteMetadata.pageDescriptions.notes}
        edges={props.pageContext.edges}
        title="Notes"
      />
    </Layout>
  );
};

export default NotesPage;

export const notesQuery = graphql`
  query NotesQuery {
    site {
      siteMetadata {
        title
        pageDescriptions {
          notes
        }
      }
    }
  }
`;
