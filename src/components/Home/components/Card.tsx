import React, { ReactNode } from 'react'

import { Box, Flex, LinkBox, LinkBoxProps, Text } from '@chakra-ui/react'

export function Card(props: CardProps) {
  const { children, label, ...restProps } = props

  return (
    <LinkBox
      as="article"
      p="5"
      maxWidth="400px"
      borderWidth="1px"
      rounded="md"
      width="100%"
      minWidth="250px"
      {...restProps}
    >
      <Flex justifyContent="center" direction="column">
        <Box width="100%">{children}</Box>
      </Flex>
      <Text fontWeight="semibold">{label}</Text>
    </LinkBox>
  )
}

export interface CardProps extends LinkBoxProps {
  children: ReactNode
  label: string
}
