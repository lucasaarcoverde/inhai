import React from 'react'
import { useLocation } from '@reach/router'
import { Grid, Flex, IconButton, Heading, Icon } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { HiLogout } from 'react-icons/hi'

import { useAuth } from '../../contexts/firebase'
import { useLayout } from '../../contexts/layout'

export function MobileTopbar() {
  const { onOpenSearch } = useLayout()
  const { pathname } = useLocation()
  const { logout } = useAuth()

  const profile = pathname.includes('profile')

  return (
    <Grid
      position="fixed"
      zIndex="docked"
      templateColumns="repeat(3, 1fr)"
      paddingLeft="1"
      paddingRight="1"
      top="0"
      direction="row"
      height="56px"
      width="100vw"
      bg="white"
      borderBottom="solid"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
    >
      <Flex h="100%" paddingLeft="3" align="center" justifyContent="flex-start">
        <Heading color="teal.500">Inhaí</Heading>
      </Flex>
      <Flex h="100%" align="center" justifyContent={'center'}></Flex>
      <Flex h="100%" align="center" justifyContent="flex-end">
        {pathname.includes('map') ? (
          <IconButton
            size="lg"
            aria-label="Search button"
            icon={<SearchIcon />}
            variant="ghost"
            colorScheme="teal"
            onClick={onOpenSearch}
          />
        ) : (
          profile && (
            <IconButton
              size="lg"
              aria-label="Logout button"
              icon={<Icon as={HiLogout} boxSize="6" />}
              variant="ghost"
              colorScheme="teal"
              onClick={logout}
            />
          )
        )}
      </Flex>
    </Grid>
  )
}
