exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/app/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/app/*'
    // Update the page.
    actions.createPage(page)
  }
}
