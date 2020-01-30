// Load environment variables from a .env file into process.env.
// Check out https://www.gatsbyjs.org/docs/environment-variables/ for more.
require('dotenv').config({
  path: `.env`
});

module.exports = {
  siteMetadata: {
    title: `Rain`,
    description: `.`,
    author: `@mediacurrent`,
    menuLinks: [
      {
        uri: '/page/about-contentful',
        title: 'About Contentful'
      },
      {
        uri: '/page/partner-us',
        title: 'Partner With Us'
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {}
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['node_modules', 'src/global']
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 75
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-rain`,
        short_name: `rain`,
        start_url: `/`,
        background_color: `#EAEAEA`,
        theme_color: `#EAEAEA`,
        display: `minimal-ui`,
        icon: `src/images/rain-favicon.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-source-rain`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
