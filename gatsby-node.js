const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators;

  return new Promise((resolve, reject) => {

    //-- If it's the home page, give it a special layout.
    if(page.path === '/') {
      page.layout = 'home'
    }

    resolve()
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []

    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                type
                path
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

        //-- Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {

          createPage({
            path: edge.node.frontmatter.path,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
              path: edge.node.frontmatter.path,
            },
          })
        })
      })
    )
  })
}
