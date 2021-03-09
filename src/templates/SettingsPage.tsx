import * as React from 'react'
import { Link } from 'gatsby'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'

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
  <Layout>
    <title>Settings</title>
    <h1 style={headingStyles}>Settings</h1>
    <p style={paragraphStyles}>
      <Link to="/">Go home</Link>.
    </p>
    {children}
  </Layout>
)

export default Settings
