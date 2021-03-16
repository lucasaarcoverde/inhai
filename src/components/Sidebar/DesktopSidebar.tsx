import { SearchIcon } from '@chakra-ui/icons'
import { Avatar, Spacer, Icon, Stack, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineSetting, AiOutlineStar } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { NavButton } from './components/NavButton'
import { CgProfile } from 'react-icons/cg'

export interface DesktopSidebarProps {
  logout: () => void
}

export function DesktopSidebar(props: DesktopSidebarProps) {
  const { logout } = props
  return (
    <Stack
      width="256px"
      height="100%"
      borderRight="solid"
      borderRightWidth="1px"
      borderColor="gray.300"
      spacing="2"
      padding="2"
    >
      <NavButton
        size="lg"
        navigateUrl="/app/map"
        leftIcon={<SearchIcon boxSize="6" />}
      >
        Mapa LGBTQI+
      </NavButton>
      <NavButton
        size="lg"
        navigateUrl="/app/ratings"
        leftIcon={<Icon as={AiOutlineStar} boxSize="6" />}
      >
        Avaliar Local
      </NavButton>
      <NavButton
        size="lg"
        navigateUrl="/app/notifications"
        leftIcon={<Icon as={IoMdNotificationsOutline} boxSize="6" />}
      >
        Notificações
      </NavButton>
      <NavButton
        size="lg"
        navigateUrl="/app/profile"
        leftIcon={<Icon as={CgProfile} boxSize="6" />}
      >
        Perfil
      </NavButton>
      <NavButton
        size="lg"
        navigateUrl="/app/settings"
        leftIcon={<Icon as={AiOutlineSetting} boxSize="6" />}
      >
        Configurações
      </NavButton>
      <NavButton
        size="lg"
        onClick={logout}
        leftIcon={<Icon as={RiLogoutBoxLine} boxSize="6" />}
      >
        Sair
      </NavButton>
      <Spacer />
      <ProfileCard />
    </Stack>
  )
}

function ProfileCard() {
  return (
    <Stack direction="row" padding="2" marginBottom="6">
      <Avatar size="md" name="Lucas Arcoverde" />
      <Flex direction="column" align="flex-start" justify="center">
        <Box as="span" fontSize="md" fontWeight="semibold">
          Lucas Arcoverde
        </Box>
        <Box as="span" fontSize="sm" fontWeight="normal" color="gray.600">
          @lucas
        </Box>
      </Flex>
    </Stack>
  )
}
