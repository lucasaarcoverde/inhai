import * as React from 'react'
import type { RouteComponentProps } from '@reach/router'
import {
  Center,
  Flex,
  Heading,
  Progress,
  Text,
  Stack,
  Box,
} from '@chakra-ui/react'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { useAuth } from '../../contexts/firebase'

export const InitialLoading = ({
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

  const { firebase } = useAuth()

  React.useEffect(() => {
    if (!loading) {
      navigate('/login')
    }
  }, [loading])

  React.useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), 15000)

    firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) return

      navigate('/app')
    })

    return () => {
      clearTimeout(loadingTimer)
    }
  }, [firebase])

  return (
    <Flex
      direction="column"
      height="100vh"
      width="100vw"
      maxH="-webkit-fill-available"
    >
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
  )
}
