import React from 'react'
import Helment from 'react-helmet'
import './pageWrapper.css'

export const PageWrapper = () => {
  return (
    <Helment
      bodyAttributes={{
        class: 'body',
      }}
      htmlAttributes={{
        class: 'html',
      }}
    >
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Inhaí" />
      <script
        type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
      ></script>
      <link rel="manifest" href="manifest.webmanifest" />
      <script async src="path/to/pwacompat.min.js"></script>
      <link
        rel="icon"
        type="image/png"
        href="res/icon-128.png"
        sizes="128x128"
      />
    </Helment>
  )
}
