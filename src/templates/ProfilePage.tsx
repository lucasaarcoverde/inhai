import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import { Profile } from '../components/Profile'
import { Footer } from '../components'
import { Link, Text } from '@chakra-ui/react'

const ProfilePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  return (
    <Layout>
      <Profile justifyContent="center" />
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
