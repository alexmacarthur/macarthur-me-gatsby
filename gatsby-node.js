const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const paginate = require('./paginate');
const redirects = require('./redirects');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    // If this node was source from the "posts" directory, slap a prefix onto the slug, 
    // so that the resulting path is formatted correctly.
    let fileNode = getNode(node.parent);
    let slugPrefix = fileNode.dir.match(/src\/posts/) ? "posts" : "";

    createNodeField({
      name: `slug`,
      node,
      value: `/${slugPrefix}${value.replace(/\/$/, ``)}`.replace(/^\/+/, '')
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Create redirects.
  redirects.forEach(redirect => {
    createRedirect(redirect);
  });

  const postsPaginationPromise = paginate({
    queryPromise: graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }, 
          limit: 1000,
          filter: {fileAbsolutePath: {regex: "/(posts)/(.*).md$/"}}
        ) {
          edges {
            node {
              excerpt(pruneLength: 250)
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                last_updated(formatString: "MMMM DD, YYYY")
                title
                external
              }
            }
          }
        }
      }
    `),
    perPage: 10,
    listPath: 'posts', 
    createPage
  });

  /**
   * Generate all pages made of markdown.
   */
  const allMarkdownPromise = graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
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

  return Promise.all([postsPaginationPromise, allMarkdownPromise]);
}
