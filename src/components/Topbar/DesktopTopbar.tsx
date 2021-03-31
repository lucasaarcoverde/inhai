import React from 'react'

import { Grid, Flex, Heading, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { TopbarProps } from './'

export function DesktopTopbar(props: TopbarProps) {
  const { onOpenSearch } = props

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      paddingLeft="6"
      paddingRight="2"
      direction="row"
      height="56px"
      width="100vw"
      bg="teal.500"
    >
      <Flex h="100%" align="center" justifyContent="flex-start">
        <Heading color="white">Inhaí</Heading>
      </Flex>
      <Flex h="100%" align="center" justifyContent="flex-end">
        {!!onOpenSearch && (
          <Button
            size="lg"
            aria-label="Search button"
            leftIcon={<SearchIcon />}
            variant="ghost"
            padding={4}
            colorScheme="whiteAlpha"
            onClick={onOpenSearch}
          >
            Buscar por local
          </Button>
        )}
      </Flex>
    </Grid>
  )
}
