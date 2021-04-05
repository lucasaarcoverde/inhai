import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Box, Stack, ModalBody, ModalHeader, Text } from '@chakra-ui/react'

export function Search() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "search.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <>
      <ModalHeader color="teal.500">Busque por um local</ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="2" height="100%" width="100%">
          <Box minW="100px">
            <Img fluid={data.file.childImageSharp.fluid} alt="Search image" />
          </Box>
          <Text fontSize="sm" fontWeight="semibold">
            Procure por locais perto de você.
          </Text>
        </Stack>
      </ModalBody>
    </>
  )
}
