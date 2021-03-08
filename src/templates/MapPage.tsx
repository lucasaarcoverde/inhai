import * as React from 'react'
import { Link } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Fragment } from 'react'

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}

// markup
const MapPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  return (
    <Fragment>
      <title>Map</title>
      {/* <Layout> */}
      <h1 style={headingStyles}>Map Test</h1>
      <p style={paragraphStyles}>
        <Link to="/">Go home</Link>.
      </p>
      {children}
      {/* </Layout> */}
    </Fragment>
  )
}

export default MapPage
