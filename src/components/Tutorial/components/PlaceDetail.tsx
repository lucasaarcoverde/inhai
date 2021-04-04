import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Box, Text, Stack, ModalBody, ModalHeader } from '@chakra-ui/react'

export function PlaceDetail() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "place-detail.png" }) {
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
      <ModalHeader color="teal.500">Detalhes do Local</ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="2" height="100%" width="100%">
          <Box minW="100px">
            <Img fluid={data.file.childImageSharp.fluid} alt="Search image" />
          </Box>
          <Text fontSize="sm" fontWeight="semibold">
            Clique nos ícones do mapa para visualizar informações sobre o local
            e as avaliações feitas!
          </Text>
        </Stack>
      </ModalBody>
    </>
  )
}
