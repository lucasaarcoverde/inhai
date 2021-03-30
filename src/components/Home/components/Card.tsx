import React, { ReactNode } from 'react'

import { Box, Flex, LinkBox, Text } from '@chakra-ui/react'

export function Card(props: Props) {
  const { children, label } = props

  return (
    <LinkBox
      as="article"
      p="5"
      maxWidth="400px"
      borderWidth="1px"
      rounded="md"
      width="100%"
      minWidth="250px"
    >
      <Flex justifyContent="center" direction="column">
        <Box width="100%">{children}</Box>
      </Flex>
      <Text>{label}</Text>
    </LinkBox>
  )
}

interface Props {
  children: ReactNode
  label: string
}
