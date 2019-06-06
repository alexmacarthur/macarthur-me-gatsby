import React from "react";
import Card from "./Card";
import HeaderBar from "./HeaderBar";

const PostList = props => {
  const posts = props.edges;

  return (
    <>
      <HeaderBar description={props.description}>
        <h1>{props.title}</h1>
      </HeaderBar>

      {posts &&
        posts.map(({ node }) => {
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
          );
        })}
    </>
  );
};

export default PostList;
