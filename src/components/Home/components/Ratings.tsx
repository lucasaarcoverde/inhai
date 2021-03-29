import React from 'react'
import { Box, LinkOverlay } from '@chakra-ui/react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import { Card } from './Card'

export function Ratings() {
  const review = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "location-review2.png" }) {
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
    <Card label="Avalie um local.">
      <LinkOverlay as={Link} to="/app/ratings">
        <Box width="100%">
          <Img fluid={review.file.childImageSharp.fluid} alt="Ratings image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
