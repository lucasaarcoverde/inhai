import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Flex, Text } from '@chakra-ui/react'

import { Link } from 'gatsby'

import { Layout } from '../components'

const AboutUsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  return (
    <Layout>
      <Flex direction="column" height="100vh" maxH="-webkit-fill-available">
        {children}
        <Text>
          Page still under development. <Link to="/app/">Go back to home!</Link>
        </Text>
      </Flex>
    </Layout>
  )
}

export default AboutUsPage
