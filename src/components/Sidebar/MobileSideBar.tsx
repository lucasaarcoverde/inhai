import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
} from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineStar, AiOutlineSetting } from 'react-icons/ai'

import React from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { NavButton } from './components/NavButton'
import { CgProfile } from 'react-icons/cg'

export function MobileSidebar(props: MobileSidebarProps) {
  const { isOpen, onClose, btnRef, logout } = props
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef as any}
      size="xs"
    >
      <DrawerOverlay>
        <DrawerContent>
          <Flex paddingX="6" paddingY="2" alignItems="center" height="12">
            <Box as="span" fontSize="lg" fontWeight="semibold">
              Inhai
            </Box>
          </Flex>
          <Divider orientation="horizontal" />
          <DrawerHeader paddingX="6">
            <DrawerCloseButton />
            <Stack direction="column" padding="0">
              <Avatar name="Lucas Arcoverde" colorScheme="telegram" />
              <Stack direction="column" spacing="0">
                <Box as="span" fontSize="md" fontWeight="semibold">
                  Lucas Arcoverde
                </Box>
                <Box
                  as="span"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                >
                  @lucas
                </Box>
              </Stack>
            </Stack>
          </DrawerHeader>
          <Divider orientation="horizontal" />
          <DrawerBody paddingX="2">
            <Stack direction="column" padding="0" spacing="16px">
              <NavButton
                onClose={onClose}
                navigateUrl="/app/map"
                leftIcon={<SearchIcon />}
              >
                Mapa LGBTQI+
              </NavButton>
              <NavButton
                onClose={onClose}
                navigateUrl="/app/ratings"
                leftIcon={<Icon as={AiOutlineStar} />}
              >
                Avaliar Local
              </NavButton>
              <NavButton
                onClose={onClose}
                navigateUrl="/app/notifications"
                leftIcon={<Icon as={IoMdNotificationsOutline} />}
              >
                Notificações
              </NavButton>
              <NavButton
                onClose={onClose}
                navigateUrl="/app/perfil"
                leftIcon={<Icon as={CgProfile} />}
              >
                Perfil
              </NavButton>
              <NavButton
                onClose={onClose}
                navigateUrl="/app/settings"
                leftIcon={<Icon as={AiOutlineSetting} />}
              >
                Configurações
              </NavButton>
            </Stack>
          </DrawerBody>
          <Divider orientation="horizontal" />
          <DrawerFooter paddingX="4" justifyContent="flex-start">
            <Box width="100%">
              <NavButton
                onClick={logout}
                onClose={onClose}
                leftIcon={<Icon as={RiLogoutBoxLine} />}
              >
                Sair
              </NavButton>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  btnRef: React.MutableRefObject<undefined>
  logout: () => void
}
