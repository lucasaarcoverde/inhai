import React from 'react'
import { Box, LinkOverlay } from '@chakra-ui/react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import { Card, CardProps } from './Card'

export function Ratings(props: Omit<CardProps, 'children'>) {
  const review = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "location-review.png" }) {
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
    <Card {...props}>
      <LinkOverlay as={Link} to="/app/ratings">
        <Box width="100%">
          <Img fluid={review.file.childImageSharp.fluid} alt="Ratings image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
