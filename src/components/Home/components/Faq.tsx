import React from 'react'
import { Box, LinkOverlay } from '@chakra-ui/react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

import { Card, CardProps } from './Card'

export function Faq(props: Omit<CardProps, 'children'>) {
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
    <Card {...props}>
      <LinkOverlay as={Link} to="/app/about-us">
        <Box width="100%">
          <Img fluid={faq.file.childImageSharp.fluid} alt="Profile image" />
        </Box>
      </LinkOverlay>
    </Card>
  )
}
