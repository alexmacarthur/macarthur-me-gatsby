module.exports = {
  siteMetadata: {
    pathPrefix: "",
    siteUrl: "https://macarthur.me",
    title: "Alex MacArthur / Nashville Web Developer",
    altTitle: "Alex MacArthur",
    author: "Alex MacArthur",
    shortBio:
      "Alex MacArthur is a front end developer working for Dave Ramsey in Nashville, TN. Soli Deo gloria.",
    description:
      "I'm a front-end web developer in Nashville, spending most of my time in WordPress and JavaScript. Hire me for your next project!",
    openGraphImage: "/open-graph.jpg",
    fbAdmins: "502371334",
    social: {
      twitterHandle: "@amacarthur",
      twitter: "https://www.twitter.com/amacarthur",
      linkedin: "https://linkedin.com/in/alexmacarthur",
      github: "https://www.github.com/alexmacarthur"
    },
    projects: [
      {
        title: "Better Resource Hints",
        description:
          "A WordPress plugin that improves performance by leveraging modern resource hints like preload, prefetch, and server push.",
        url: "https://wordpress.org/plugins/better-resource-hints/"
      },
      {
        title: "TypeIt",
        description:
          "The most versatile JavaScript animated typing utility on the planet.",
        url: "https://typeitjs.com"
      },
      {
        title: "Complete Open Graph",
        description:
          "A WordPress plugin enabling simple, comprehensive Open Graph management.",
        url: "https://wordpress.org/plugins/complete-open-graph/"
      },
      {
        title: "WP Vue",
        description:
          "A simple blog template built with Vue JS, powered by the WordPress REST API.",
        url: "https://wp.netlify.com"
      },
      {
        title: "Sahlstrom's",
        description:
          "A custom WordPress site designed and built for an HVAC company in Minnesota.",
        url: "http://www.sahlstromsheating.com"
      },
      {
        title: "Lavish Salon & Spa",
        description:
          "A simple, static website designed, built, &amp; optimized for a local salon and spa using Jekyll.",
        url: "http://www.lavishsalonspamn.com"
      },
      {
        title: "Lifewall",
        description:
          "Custom e-commerce website designed, built, and optimized for a startup large format printing company using Magento.",
        url: "http://www.yourlifewall.com"
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
        name: "pages"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
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
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Nunito\:400,900`, `Merriweather\:400,400i,700`]
      }
    }
  ]
};
