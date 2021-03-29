module.exports = {
  siteMetadata: {
    title: 'inhai',
    siteUrl: 'https://inhai.vercel.app',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        name: `Inhai`,
        short_name: `Inhai`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
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
