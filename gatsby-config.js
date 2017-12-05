module.exports = {
  pathPrefix: "/posts",
  siteMetadata: {
    title: "Alex MacArthur / Nashville Web Developer",
    author: "Alex MacArthur",
    description: "I'm a front end web developer in Nashville, spending most of my time in the WordPress and JavaScript spaces.",
    social: {
      twitter: "https://www.twitter.com/amacarthur",
      linkedin: "https://linkedin.com/in/alexmacarthur",
      github: "https://www.github.com/alexmacarthur"
    },
    projects: [
      {
        title: "TypeIt",
        description: "The most versatile JavaScript animated typing utility on the planet.",
        url : "https://typeitjs.com"
      },
      {
        title: "Complete Open Graph",
        description: "A WordPress plugin enabling simple, comprehensive Open Graph management.",
        url : "https://wordpress.org/plugins/complete-open-graph/"
      },
      {
        title: "WP Vue",
        description: "A simple blog template built with Vue JS, powered by the WordPress REST API.",
        url: "https://wp.netlify.com"
      }
    ]
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`
  ]
}
