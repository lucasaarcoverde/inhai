import { SearchIcon } from '@chakra-ui/icons'
import type { StackProps } from '@chakra-ui/react'
import { Avatar, Icon, Stack, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import {
  AiOutlineStar,
  AiOutlineInfoCircle,
  AiOutlineHome,
} from 'react-icons/ai'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { useLocation } from '@reach/router'

import { NavButton } from './components/NavButton'
import { useAuth } from '../../contexts/firebase'

export type DesktopSidebarProps = StackProps

export function DesktopSidebar(props: DesktopSidebarProps) {
  const { logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <Flex
      width="100%"
      padding="2"
      shadow="md"
      justifyContent="flex-end"
      height="100%"
    >
      <Stack
        spacing="2"
        minWidth="300px"
        maxWidth="350px"
        width="100%"
        {...props}
      >
        <NavButton
          size="lg"
          navigateUrl="/app"
          leftIcon={<Icon as={AiOutlineHome} boxSize="6" />}
          bg={pathname === '/app' ? 'gray.50' : 'whiteAlpha'}
        >
          Página Principal
        </NavButton>
        <NavButton
          size="lg"
          navigateUrl="/app/map"
          leftIcon={<SearchIcon boxSize="6" />}
          bg={pathname === '/app/map' ? 'gray.50' : 'whiteAlpha'}
        >
          Mapa LGBTI+
        </NavButton>
        <NavButton
          size="lg"
          navigateUrl="/app/ratings"
          leftIcon={<Icon as={AiOutlineStar} boxSize="6" />}
          bg={pathname.includes('/app/ratings') ? 'gray.50' : 'whiteAlpha'}
        >
          Avaliar Local
        </NavButton>
        <NavButton
          size="lg"
          navigateUrl="/app/profile"
          leftIcon={<Icon as={CgProfile} boxSize="6" />}
          bg={pathname.includes('/app/profile') ? 'gray.50' : 'whiteAlpha'}
        >
          Perfil
        </NavButton>
        <NavButton
          size="lg"
          navigateUrl="/app/about"
          leftIcon={<Icon as={AiOutlineInfoCircle} boxSize="6" />}
          bg={pathname.includes('/app/profile') ? 'gray.50' : 'whiteAlpha'}
        >
          Sobre o projeto
        </NavButton>
        <NavButton
          size="lg"
          onClick={logout}
          leftIcon={<Icon as={RiLogoutBoxLine} boxSize="6" />}
        >
          Sair
        </NavButton>
        <ProfileCard bottom="72px" />
      </Stack>
    </Flex>
  )
}

function ProfileCard(props: StackProps) {
  const { user } = useAuth()

  const { name, photo, displayName } = user ?? {}

  return (
    <Stack
      direction="row"
      position="fixed"
      maxW="350px"
      paddingX="2"
      {...props}
    >
      <Avatar size="md" bg="transparent" name={name} src={photo} />
      <Flex direction="column" align="flex-start" justify="center">
        {name && (
          <>
            <Box as="span" fontSize="md" fontWeight="semibold">
              {name ?? 'Nome de usuário'}
            </Box>
            <Box as="span" fontSize="sm" fontWeight="normal" color="gray.600">
              {`@${displayName}`}
            </Box>
          </>
        )}
      </Flex>
    </Stack>
  )
}
