import React from 'react'
import { Box, LinkOverlay } from '@chakra-ui/react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

import { Card } from './Card'

export function Faq() {
  const faq = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "faq.png" }) {
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
    <Card label="Sobre nós.">
      <LinkOverlay as={Link} to="/app/about-us">
        <Box width="100%">
          <Img fluid={faq.file.childImageSharp.fluid} alt="Profile image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
