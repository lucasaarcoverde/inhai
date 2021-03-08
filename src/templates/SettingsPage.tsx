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
const Settings = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => (
  <Fragment>
    <title>Settings</title>
    <h1 style={headingStyles}>Settings</h1>
    <p style={paragraphStyles}>
      <Link to="/">Go home</Link>.
    </p>
    {children}
  </Fragment>
)

export default Settings
