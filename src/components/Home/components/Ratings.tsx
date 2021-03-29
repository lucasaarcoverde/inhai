import React from 'react'
import { Box, LinkOverlay } from '@chakra-ui/react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Card } from './Card'
import { useMediaQueryContext } from '../../../contexts'
import { Link } from 'gatsby'
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
  const { desktop } = useMediaQueryContext()

  return (
    <Card label="Avalie um local.">
      <LinkOverlay as={Link} to="/app/ratings">
        <Box width="100%" maxWidth={desktop ? '400px' : '250px'}>
          <Img fluid={review.file.childImageSharp.fluid} alt="Ratings image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
