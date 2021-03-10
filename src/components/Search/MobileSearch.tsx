import { Box, CloseButton, Input, Slide, Stack } from '@chakra-ui/react'
import React from 'react'
import { SearchProps } from './index'

export function MobileSearch(props: SearchProps) {
  const { onCloseSearch, isSearchOpen } = props

  return (
    <Slide
      direction="bottom"
      in={isSearchOpen}
      style={{ zIndex: 10, margin: 0 }}
    >
      <Box
        h="100vh"
        paddingX="4"
        paddingY="2"
        bg="white"
        rounded="md"
        shadow="md"
      >
        <Stack spacing="2">
          <CloseButton onClick={onCloseSearch} />
          <Input placeholder="Buscar local LGBT-Friendly" />
        </Stack>
      </Box>
    </Slide>
  )
}
