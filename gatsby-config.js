module.exports = {
  siteMetadata: {
    title: 'Inhaí',
    siteUrl: 'https://inhai.vercel.app',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        isResettingCSS: true,
        isUsingColorMode: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        name: `Inhaí`,
        short_name: `Inhaí`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#319795`,
        orientation: 'portrait',
        display: 'standalone',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/*.{js,jpg,png,html,css}'],
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      __key: 'images',
    },
  ],
}
//   plugins: [
//     {
//       resolve: `gatsby-plugin-ts-config`,
//       options: {
//         configDir: '/src/gatsby/',
//         tsNode: true,
//       },
//     },
//   ],
// }
