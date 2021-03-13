import React from 'react'
import Helment from 'react-helmet'

export const PageWrapper = () => {
  return (
    <Helment>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="App Title" />
      <script
        type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
      ></script>
    </Helment>
  )
}
