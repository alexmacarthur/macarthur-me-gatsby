const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: value.replace(/\/$/, ``)
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  /**
   * Generate pages JUST for `post` pagination.
   */
  const paginationPromise = graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }, 
          limit: 1000,
          filter: {fileAbsolutePath: {regex: "/(\/pages\/posts)/(.*).md$/"}}
        ) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    //-- Create blog posts pages.
    const PAGE_SIZE = 3;

    const posts = result.data.allMarkdownRemark.edges;
    const pageChunks = _.chunk(posts, PAGE_SIZE);

    pageChunks.forEach((chunk, index) => {

      let pageNumber = index + 1;

      createPage({
        path: pageNumber > 1 ? `posts/${pageNumber}` : `posts`,
        component: path.resolve('./src/pages/posts/index.js'),
        context: {
          skip: PAGE_SIZE * (pageNumber - 1),
          limit: PAGE_SIZE,
          pageNumber: pageNumber,
          totalPages: pageChunks.length,
          hasNextPage: pageNumber < pageChunks.length,
          hasPreviousPage: pageNumber > 1,
          nextPageLink: `/posts/${pageNumber + 1}`,
          previousPageLink: (pageNumber - 1) > 1 ? `/posts/${pageNumber - 1}` : `/posts/`,
        }
      });
    });
  });

  /**
   * Generate all pages made of markdown.
   */
  const allPagesPromise = graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title,
                external
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(post => {
      createPage({
        path: post.node.fields.slug,
        component: path.resolve('./src/templates/page.js'),
        context: {
          slug: post.node.fields.slug
        },
      });
    });
  });

  return Promise.all([paginationPromise, allPagesPromise]);
}
