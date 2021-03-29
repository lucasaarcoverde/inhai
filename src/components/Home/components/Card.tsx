import React, { ReactNode } from 'react'

import { Heading, LinkBox, Text } from '@chakra-ui/react'

export function Card(props: Props) {
  const { children, label } = props

  return (
    <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
      <Heading size="md" my="2">
        {children}
      </Heading>
      <Text>{label}</Text>
    </LinkBox>
  )
}

interface Props {
  children: ReactNode
  label: string
}
