import React from 'react'

import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Card } from './Card'
import { Box, LinkOverlay } from '@chakra-ui/react'

export function Search() {
  const search = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "location-search2.png" }) {
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
    <Card label="Visualize os locais mais bem avaliados como LGBTQI+ friendly.">
      <LinkOverlay as={Link} to="/app/map">
        <Box width="100%">
          <Img fluid={search.file.childImageSharp.fluid} alt="Search image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
