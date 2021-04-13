import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Profile } from '../components/Profile'
import { Sidebar } from '../components'
import { FlexProps, Grid } from '@chakra-ui/react'
import { useMediaQuery } from '../contexts'

const ProfilePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { desktop } = useMediaQuery()

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 112px)', overflowY: 'scroll' }
    : {}

  return (
    <Grid templateColumns={desktop ? '1fr 2fr 1fr' : '1fr'}>
      {desktop && <Sidebar />}
      <Profile justifyContent="center" {...layoutProps} />
      {children}
    </Grid>
  )
}

export default ProfilePage
