import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  Center,
  Flex,
  Heading,
  Progress,
  Text,
  Stack,
  Box,
} from '@chakra-ui/react'

import { useAuth } from '../contexts/firebase'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Fragment } from 'react'

const LoadingPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const [loading, setLoading] = React.useState(true)

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "loading.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { authToken } = useAuth()

  React.useEffect(() => {
    if (!loading) {
      navigate('/login')
    }
  }, [loading])

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 15000)
    if (authToken) setTimeout(() => navigate('/app'), 1500)

    return
  }, [authToken])

  return (
    <Fragment>
      <Flex direction="column" height="100vh" maxH="-webkit-fill-available">
        <Progress size="xs" colorScheme="teal" isIndeterminate />
        {children}
        <Center height="100%">
          <Stack spacing={6} width="100%">
            <Center>
              <Heading color="teal.500">Inhaí</Heading>
            </Center>
            <Center width="100%">
              <Box width="100%" maxWidth="1111px">
                <Img
                  fluid={data.file.childImageSharp.fluid}
                  alt="Loading image"
                />
              </Box>
            </Center>
            <Center>
              <Text color="blackAlpha">Iniciando sessão...</Text>
            </Center>
          </Stack>
        </Center>
      </Flex>
    </Fragment>
  )
}

export default LoadingPage
