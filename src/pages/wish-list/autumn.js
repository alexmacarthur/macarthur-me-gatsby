import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import HeaderBar from "../../components/HeaderBar";
import List from "../../components/List";

const WishListPage = ({ data }) => {
  return (
    <Layout>
      <HeaderBar>
        <h1>Autumn's Wish List</h1>
      </HeaderBar>

      <List listJson={data.allAutumnWishListJson} />
    </Layout>
  );
};

export const WishListQuery = graphql`
  query AutumnWishListQuery {
    allAutumnWishListJson {
      edges {
        node {
          id
          name
          link
        }
      }
    }
  }
`;

export default WishListPage;
