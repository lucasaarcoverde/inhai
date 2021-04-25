import React from 'react'
import {
  HStack,
  Flex,
  Heading,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { navigate } from 'gatsby'

import { useAuth } from '../../contexts/firebase'
import { NavButton } from './components/NavButton'
import type { TopbarProps } from '.'

export function DesktopTopbar(props: TopbarProps) {
  const { logout } = useAuth()

  const { photo } = props

  return (
    <Flex
      {...props}
      position="fixed"
      direction="row"
      height="56px"
      width="100%"
      top="0"
      justifyContent="space-between"
      align="center"
      bg="white"
      zIndex="docked"
      borderBottom="solid"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      paddingX="4"
    >
      <Heading color="teal.500">Inhaí</Heading>
      <HStack spacing="2" {...props}>
        <NavButton size="lg" navigateUrl="/app">
          Página Principal
        </NavButton>
        <NavButton size="lg" navigateUrl="/app/map">
          Mapa
        </NavButton>
        <NavButton size="lg" navigateUrl="/app/ratings">
          Avaliar Local
        </NavButton>
        <NavButton size="lg" navigateUrl="/app/about">
          Sobre o projeto
        </NavButton>
        <Box>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  variant="ghost"
                  colorScheme="teal"
                >
                  <Avatar size="sm" src={photo} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate('/app/profile')}>
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={logout}>Sair</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </HStack>
    </Flex>
  )
}
