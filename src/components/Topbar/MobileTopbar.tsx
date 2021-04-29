import React from 'react'
import { useLocation } from '@reach/router'
import {
  Grid,
  Flex,
  IconButton,
  Heading,
  Icon,
  Avatar,
  Button,
} from '@chakra-ui/react'
import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import { HiLogout } from 'react-icons/hi'
import { navigate } from 'gatsby'

import { useAuth } from '../../contexts/firebase'
import { useLayout } from '../../contexts/layout'
import type { TopbarProps } from '.'

export function MobileTopbar(props: TopbarProps) {
  const { onOpenSearch } = useLayout()
  const { photo } = props
  const { pathname } = useLocation()
  const { logout } = useAuth()

  const profile = pathname.includes('profile')
  const ratings = pathname.includes('ratings')

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
      <Flex h="100%" align="center" justifyContent="flex-start">
        {ratings || profile ? (
          <IconButton
            size="lg"
            aria-label="Voltar para página anterior"
            icon={<ArrowBackIcon boxSize="6" />}
            variant="ghost"
            colorScheme="teal"
            onClick={() => navigate(-1)}
          />
        ) : (
          <Button
            variant="ghost"
            aria-label="Página do perfil"
            colorScheme="teal"
            onClick={() => {
              if (!profile) navigate('/app/profile')
            }}
          >
            <Avatar size="sm" src={photo} />
          </Button>
        )}
      </Flex>
      <Flex justifyContent="center" align="center">
        <Heading color="teal.500">Inhaí</Heading>
      </Flex>
      <Flex h="100%" align="center" justifyContent="flex-end">
        {pathname === '/app/map' ? (
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
