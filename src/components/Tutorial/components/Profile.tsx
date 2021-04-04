import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Box, Text, Stack, ModalBody, ModalHeader } from '@chakra-ui/react'

export function Profile() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "profile-page.png" }) {
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
      <ModalHeader color="teal.500">Perfil</ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="2" height="100%" width="100%">
          <Box minW="100px">
            <Img fluid={data.file.childImageSharp.fluid} alt="Search image" />
          </Box>
          <Text fontSize="sm" fontWeight="semibold">
            Edite o seu perfil e caso não se sinta representade contate-nos!
          </Text>
        </Stack>
      </ModalBody>
    </>
  )
}
