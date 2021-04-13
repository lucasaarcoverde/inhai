import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Profile } from '../components/Profile'
import { Sidebar } from '../components'
import { Flex, FlexProps, Grid, Link, Text } from '@chakra-ui/react'
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

      <Flex justifyContent="center" paddingBottom="6">
        <Text fontSize="xs" fontWeight="normal">
          Não se sentiu representade?{' '}
          <Link
            href="mailto: inhaiapp@gmail.com"
            fontWeight="bold"
            color="blue.600"
          >
            Entre em contato
          </Link>
        </Text>
      </Flex>
    </Grid>
  )
}

export default ProfilePage
