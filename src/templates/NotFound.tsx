import * as React from 'react'
import { Center, Heading, Stack, Text, Link, Box } from '@chakra-ui/react'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import type { RouteComponentProps } from '@reach/router'

const NotFound = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "404.png" }) {
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

  return (
    <Center height="100vh" width="100vw" maxHeight="-webkit-fill-available">
      {children}
      <Stack width="100%" spacing="6">
        <Center>
          <Heading color="teal.500">Inhaí</Heading>
        </Center>
        <Center width="100%">
          <Box width="100%" maxWidth="1314px">
            <Img fluid={data.file.childImageSharp.fluid} alt="404 image" />
          </Box>
        </Center>
        <Center>
          <Text
            fontSize={['xs', 'xs', 'md']}
            color="blackAlpha"
            fontWeight="semibold"
          >
            Ops, página não encontrada,{' '}
            <Link as={GatsbyLink} color="blue.600" cursor="pointer" to="/app">
              clique aqui para voltar!
            </Link>
          </Text>
        </Center>
      </Stack>
    </Center>
  )
}

export default NotFound
