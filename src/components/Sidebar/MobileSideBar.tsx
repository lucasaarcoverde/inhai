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
  Text,
  Stack,
} from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'
// import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineStar } from 'react-icons/ai'

import React from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { NavButton } from './components/NavButton'
import { CgProfile } from 'react-icons/cg'
import { useAuth } from '../../contexts/firebase'

export function MobileSidebar(props: MobileSidebarProps) {
  const { isOpen, onClose, btnRef, logout } = props
  const { user } = useAuth()

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef as any}
      size="xs"
    >
      <DrawerOverlay>
        <DrawerContent bg="white">
          <Flex paddingX="6" paddingY="2" alignItems="center" height="12">
            <Text fontSize="lg" fontWeight="bold" color="teal.400">
              Inhaí
            </Text>
          </Flex>
          <Divider orientation="horizontal" />
          <DrawerHeader paddingX="6">
            <DrawerCloseButton />
            <Stack direction="column" padding="0">
              <Avatar bg="transparent" name={user?.name} src={user?.photo} />
              <Stack direction="column" spacing="0">
                {user?.name && (
                  <>
                    <Box as="span" fontSize="md" fontWeight="semibold">
                      {user.name ?? 'Nome de usuário'}
                    </Box>
                    <Box
                      as="span"
                      fontSize="sm"
                      fontWeight="normal"
                      color="gray.600"
                    >
                      {`@${user?.displayName ?? user.name}`}
                    </Box>
                  </>
                )}
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
              {/* <NavButton
                onClose={onClose}
                navigateUrl="/app/notifications"
                leftIcon={<Icon as={IoMdNotificationsOutline} />}
              >
                Notificações
              </NavButton> */}
              <NavButton
                onClose={onClose}
                navigateUrl="/app/profile"
                leftIcon={<Icon as={CgProfile} />}
              >
                Perfil
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
