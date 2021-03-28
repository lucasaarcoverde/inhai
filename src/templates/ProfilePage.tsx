import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import { Profile } from '../components/Profile'

// markup
const ProfilePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  return (
    <Layout>
      <title>Profile</title>
      <Profile />
      {children}
    </Layout>
  )
}

export default ProfilePage
