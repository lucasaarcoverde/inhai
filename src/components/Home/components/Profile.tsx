import React from 'react'
import { Box, LinkOverlay } from '@chakra-ui/react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

import { Card } from './Card'

export function Profile() {
  const profile = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "profile.png" }) {
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
    <Card label="Edite seu perfil ou visualize suas informações.">
      <LinkOverlay as={Link} to="/app/profile">
        <Box width="100%">
          <Img fluid={profile.file.childImageSharp.fluid} alt="Profile image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
