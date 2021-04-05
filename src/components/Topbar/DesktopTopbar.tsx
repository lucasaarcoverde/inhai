import React from 'react'

import { Box, Flex, Heading, Divider, FlexboxProps } from '@chakra-ui/react'

export function DesktopTopbar(props: FlexboxProps) {
  return (
    <Box>
      <Flex
        {...props}
        position="fixed"
        direction="row"
        height="56px"
        width="100%"
        justifyContent="center"
        align="center"
        bg="white"
        zIndex="docked"
      >
        <Heading color="teal.500">Inhaí</Heading>
      </Flex>
      <Divider width="100%" top="56px" position="fixed" />
    </Box>
  )
}
