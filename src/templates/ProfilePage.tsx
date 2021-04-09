import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import { Profile } from '../components/Profile'
import { Footer } from '../components'
import { FlexProps, Link, Text } from '@chakra-ui/react'
import { useMediaQuery } from '../contexts'

const ProfilePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { desktop } = useMediaQuery()
  const layoutProps = desktop
    ? { height: 'calc(100vh - 56px)', overflowY: 'scroll' }
    : {}

  return (
    <Layout>
      <Profile justifyContent="center" {...(layoutProps as FlexProps)} />
      {children}
      <Footer justifyContent="center" align="center">
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
      </Footer>
    </Layout>
  )
}

export default ProfilePage
