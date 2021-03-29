import React from 'react'
import { useLocation } from '@reach/router'
import {
  Grid,
  Flex,
  IconButton,
  Heading,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import { navigate } from 'gatsby'
import { HiLogout } from 'react-icons/hi'

import { useAuth } from '../../contexts/firebase'
import { TopbarProps } from './'

export function MobileTopbar(props: TopbarProps) {
  const { onOpenSearch } = props
  const { pathname } = useLocation()
  const { logout } = useAuth()

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        paddingLeft="1"
        paddingRight="1"
        direction="row"
        height="56px"
        width="100vw"
        bg="whiteAlpha"
      >
        <Flex h="100%" align="center" justifyContent="flex-start">
          {pathname !== '/app/' && (
            <IconButton
              onClick={() => navigate('/app/')}
              size="lg"
              aria-label="LeftNav button"
              icon={<ArrowBackIcon boxSize="6" />}
              variant="ghost"
              colorScheme="teal"
            />
          )}
        </Flex>

        <Flex h="100%" align="center" justifyContent={'center'}>
          <Heading color="teal.500">Inhaí</Heading>
        </Flex>
        <Flex h="100%" align="center" justifyContent="flex-end">
          {!!onOpenSearch ? (
            <IconButton
              size="lg"
              aria-label="Search button"
              icon={<SearchIcon />}
              variant="ghost"
              colorScheme="teal"
              onClick={onOpenSearch}
            />
          ) : (
            pathname === '/app/' && (
              <IconButton
                size="lg"
                aria-label="Search button"
                icon={<Icon as={HiLogout} boxSize="6" />}
                variant="ghost"
                colorScheme="teal"
                onClick={logout}
              />
            )
          )}
        </Flex>
      </Grid>
      <Divider w="100vw" />
    </>
  )
}