import React, { Fragment } from 'react'

import { Flex, Heading, Divider, FlexboxProps } from '@chakra-ui/react'

export function DesktopTopbar(props: FlexboxProps) {
  return (
    <Fragment>
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
      >
        <Heading color="teal.500">Inhaí</Heading>
      </Flex>
      <Divider width="100%" top="56px" position="fixed" />
    </Fragment>
  )
}
