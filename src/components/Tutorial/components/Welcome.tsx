import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Box, Text, Stack, ModalBody, ModalHeader } from '@chakra-ui/react'
import { User } from '../../../contexts/firebase'

export function Welcome(props: WelcomeProps) {
  const {
    user: { displayName },
  } = props
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "welcome.png" }) {
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
      <ModalHeader color="teal.500">Seja bem vindo!</ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="2" height="100%" width="100%">
          <Box>
            <Img fluid={data.file.childImageSharp.fluid} alt="Search image" />
          </Box>
          <Text fontSize="sm" fontWeight="semibold">
            Inhaí {displayName}!
            <br />
            Preparamos um tutorial rápidinho para te mostrar as principais
            funcionalidades do nosso app.
          </Text>
        </Stack>
      </ModalBody>
    </>
  )
}

interface WelcomeProps {
  user: User
}
