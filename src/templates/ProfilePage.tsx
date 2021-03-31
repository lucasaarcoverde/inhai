import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import { Profile } from '../components/Profile'

const ProfilePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  return (
    <Layout>
      <title>Profile</title>
      <Profile justifyContent="center" />
      {children}
    </Layout>
  )
}

export default ProfilePage
