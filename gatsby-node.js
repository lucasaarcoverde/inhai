exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/app/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/app/*'
    // Update the page.
    actions.createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      // Don't bundle modules that reference browser globals such as `window` and `IDBIndex` during SSR.
      // See: https://github.com/gatsbyjs/gatsby/issues/17725
      externals: getConfig().externals.concat(function (
        _context,
        request,
        callback
      ) {
        // Exclude bundling firebase* and react-firebase*
        // These are instead required at runtime.
        if (/^@?(react-)?firebase(.*)/.test(request)) {
          console.log('Excluding bundling of: ' + request)
          return callback(null, 'umd ' + request)
        }
        callback()
      }),
    })
  }
}
