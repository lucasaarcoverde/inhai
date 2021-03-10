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
const ProfilePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  return (
    <Layout>
      <title>Profile</title>
      <h1 style={headingStyles}>Profile</h1>
      <p style={paragraphStyles}>
        <Link to="/">Go home</Link>.
      </p>
      {children}
    </Layout>
  )
}

export default ProfilePage
