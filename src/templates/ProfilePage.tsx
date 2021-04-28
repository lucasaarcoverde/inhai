import * as React from 'react'
import type { RouteComponentProps } from '@reach/router'
import type { FlexProps } from '@chakra-ui/react'
import { Grid } from '@chakra-ui/react'

import { Profile } from '../components/Profile'
import { useMediaQuery } from '../contexts'

const ProfilePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { desktop } = useMediaQuery()

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 56px)', overflowY: 'scroll' }
    : {}

  return (
    <Grid templateColumns={'1fr'}>
      <Profile justifyContent="center" {...layoutProps} />
      {children}
    </Grid>
  )
}

export default ProfilePage
