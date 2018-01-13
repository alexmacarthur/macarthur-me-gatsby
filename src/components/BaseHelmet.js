import React from 'react'
import Helmet from 'react-helmet'

import config from '../../gatsby-config.js';

class BaseHelmet extends React.Component {
  render() {
    return (
        <Helmet>
          <meta name="viewport" content="width=device-width" />
          <title>{config.siteMetadata.title}</title>

          <meta name="description" content={config.siteMetadata.description} />
          <meta name="keywords" content="freelance, web development, web developer, WordPress, javascript" />
          <meta name="author" content={config.siteMetadata.author} />
          <meta property="fb:admins" content="502371334" /> 
          <meta property="og:type" content="website" /> 
          <meta property="og:title" content={config.siteMetadata.title} />
          <meta property="og:description" content={config.siteMetadata.description} />
          <meta property="og:image" content="https://raw.githubusercontent.com/alexmacarthur/macarthur.me/127ca1d9/static/open-graph.jpg" />
          <meta property="og:url" content="https://macarthur.me" />

          <script type="application/ld+json">
            {JSON.stringify(
              {
                "@context": "http://schema.org",
                "@type": "ProfessionalService",
                "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nashville",
                "addressRegion": "TN"
                },
                  "image" : "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAASZAAAAJGI5NDJiMTg5LWI3YmYtNDg1OC1hNjE1LTg1ZmMzNzFjYmJhMQ.jpg",
                "email": "alex@macarthur.me",
                "description": ""I'm a front-end web developer in Nashville, spending most of my time in WordPress and JavaScript. Hire me for your next project!",
                "name": "Alex MacArthur / Nashville Web Developer",
                "sameAs" : [ "http://www.twitter.com/amacarthur", "https://www.linkedin.com/in/alexmacarthur", "https://github.com/alexmacarthur"],
                "telephone" : "507-476-1414",
                "priceRange" : "$500 - $10000"
              }
            )}
          </script>

        </Helmet>
    )
  }
}

export default BaseHelmet
