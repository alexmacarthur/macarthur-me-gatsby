import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import HeaderBar from "../../components/HeaderBar";
import List from "../../components/List";

const WishListPage = ({ data }) => {
  return (
    <Layout>
      <HeaderBar>
        <h1>Wish List</h1>
      </HeaderBar>

      <p>
        If you're obligated to get me something for my birthday, Christmas, or
        out of pure adoration, here are some ideas. Unless it's specifically
        mentioned in the name of the item, I'm not picky about brands. Links are
        not prescriptive of where you might make a purchase, and sometimes are
        just intended to provide examples of what I'm talking about.
      </p>

      <br />

      <List listJson={data.allAlexWishListJson} />
    </Layout>
  );
};

export const WishListQuery = graphql`
  query WishListQuery {
    allAlexWishListJson {
      edges {
        node {
          id
          name
          link
          description
        }
      }
    }
  }
`;

export default WishListPage;
