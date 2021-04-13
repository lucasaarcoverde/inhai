import React from 'react'

import { Flex, Heading, FlexboxProps } from '@chakra-ui/react'

export function DesktopTopbar(props: FlexboxProps) {
  return (
    <Flex
      {...props}
      position="fixed"
      direction="row"
      height="56px"
      width="100%"
      top="0"
      justifyContent="center"
      align="center"
      bg="white"
      zIndex="docked"
      borderBottom="solid"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
    >
      <Heading color="teal.500">Inhaí</Heading>
    </Flex>
  )
}
