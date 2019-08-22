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
      "I'm a front-end web developer in Nashville, spending most of my time in WordPress and JavaScript. Hire me for your next project!",
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
    `gatsby-plugin-feed`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    }
  ]
};
