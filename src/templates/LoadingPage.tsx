import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Progress,
  Text,
  Stack,
  Box,
  extendTheme,
} from '@chakra-ui/react'

import { useAuth } from '../contexts/firebase'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import theme from '../theme'

const LoadingPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
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
    if (!authToken) return

    setTimeout(() => navigate('/'), 2000)
  }, [authToken])

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Flex direction="column" height="100vh">
        <Progress
          size="xs"
          colorScheme="teal"
          marginBottom={1}
          isIndeterminate
        />
        <title>Loading Page</title>
        {children}
        <Center height="100%">
          <Stack spacing={6} width="100%">
            <Center>
              <Heading color="teal">Inhaí</Heading>
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
              <Text color="blackAlpha.700">Iniciando sessão....</Text>
            </Center>
          </Stack>
        </Center>
      </Flex>
    </ChakraProvider>
  )
}

export default LoadingPage
