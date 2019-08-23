module.exports = {
  siteMetadata: {
    pathPrefix: "",
    siteUrl: "https://macarthur.me",
    title: "Alex MacArthur / Nashville Web Developer",
    altTitle: "Alex MacArthur",
    author: "Alex MacArthur",
    shortBio:
      "Alex MacArthur is a developer working for Dave Ramsey in Nashville. Soli Deo gloria.",
    description:
      "I'm a web developer in Nashville, spending most of my time in Node, PHP, and React. Hire me for your next project!",
    openGraphImage: "/open-graph.jpg",
    fbAdmins: "502371334",
    pageDescriptions: {
      posts: "Thoughts, explanations, and musings, usually on web development."
    },
    social: {
      twitterHandle: "@amacarthur",
      twitter: "https://www.twitter.com/amacarthur",
      linkedin: "https://linkedin.com/in/alexmacarthur",
      github: "https://www.github.com/alexmacarthur"
    }
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants"
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-69526831-1`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-feed`, 
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          } 
        `, 
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl;
                const postUrl = `${site.siteMetadata.siteUrl}/edge.node.fields.slug`;
                const postText = `
                  <div style="margin-top=55px; font-style: italic;">
                    (This is an article published at macarthur.me. <a href="${postUrl}">Read it online here</a>.)
                  </div>
                `;

                let html = edge.node.html;

                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.frontmatter.date,
                  url: postUrl,
                  guid: postUrl,
                  custom_elements: [{ 'content:encoded': html + postText }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Alex MacArthur's RSS Feed",
            match: "^/posts/",
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    }
  ]
};
