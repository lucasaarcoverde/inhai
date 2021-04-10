import React, { forwardRef, Ref } from 'react'
import { StackProps, Stack, Text, Box } from '@chakra-ui/layout'

import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

export const EmptyState = forwardRef(
  (props: EmptyStateProps, ref: Ref<HTMLDivElement>) => {
    const { searchValue, ...restProps } = props

    const data = useStaticQuery(graphql`
      query {
        file(relativePath: { eq: "no-results.png" }) {
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
      <Stack ref={ref} {...restProps} align="center" marginTop="10" spacing="1">
        <Text
          fontSize={'md'}
          color="black"
          fontWeight="semibold"
          textAlign="center"
        >
          Nenhum resultado encontrado para "{searchValue}"
        </Text>
        <Text
          color="gray.600"
          fontWeight="semibold"
          fontSize={['xs', 'sm']}
          textAlign="center"
        >
          Cheque se você digitou corretamente ou tente adicionar mais detalhes
          para uma busca mais precisa.
        </Text>
        <Box width="100%">
          <Img fluid={data.file.childImageSharp.fluid} alt="" />
        </Box>
      </Stack>
    )
  }
)

export interface EmptyStateProps extends StackProps {
  searchValue: string
}
