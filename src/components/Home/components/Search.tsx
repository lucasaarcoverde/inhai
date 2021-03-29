import React from 'react'

import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Card } from './Card'
import { Box, LinkOverlay } from '@chakra-ui/react'
import { useMediaQueryContext } from '../../../contexts'

export function Search() {
  const search = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "location-search.png" }) {
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
    <Card label="Visualize os locais mais bem avaliados como LGBTQI+ friendly.">
      <LinkOverlay as={Link} to="/app/map">
        <Box width="100%" maxWidth={desktop ? '400px' : '250px'}>
          <Img fluid={search.file.childImageSharp.fluid} alt="Search image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
