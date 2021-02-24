import React from 'react'
import Helment from 'react-helmet'

export const PageWrapper = () => {
  return (
    <Helment>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="App Title" />
    </Helment>
  )
}
