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
import React from 'react'
import { LeftNav } from './LeftNav'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { NavButton } from './NavButton'

export function MobileSidebar(props: MobileSidebarProps) {
  const { isOpen, onClose, btnRef } = props
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef as any}
      size="xs"
    >
      <DrawerOverlay width="md">
        <DrawerContent>
          <Flex paddingX="4" paddingY="2" alignItems="center" height="12">
            <Box as="span" fontSize="lg" fontWeight="semibold">
              Inhai
            </Box>
          </Flex>
          <Divider orientation="horizontal" />
          <DrawerHeader paddingX="4">
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
          <DrawerBody paddingX="4">
            <LeftNav onClose={onClose} />
          </DrawerBody>
          <Divider orientation="horizontal" />
          <DrawerFooter paddingX="4" justifyContent="flex-start">
            <Box width="100%">
              <NavButton
                navigateUrl="/"
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
}
