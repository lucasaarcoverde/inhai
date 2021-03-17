import {
  Button,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from 'react'

import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { Sidebar } from './Sidebar'
import { FirebaseProvider, useMediaQueryContext } from '../contexts'
import PrivateRoute from './PrivateRoute'
import firebase from 'firebase'
import { navigate } from 'gatsby'

export function Layout({ children, onOpenSearch }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = React.useRef()

  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.removeItem('authToken')
        navigate('/login')
      })
  }, [])

  return (
    <FirebaseProvider>
      <PrivateRoute path="/login">
        <ChakraProvider>
          <Stack
            h="100vh"
            direction="column"
            spacing="0"
            maxHeight="100vh"
            overflowY="hidden"
          >
            <Header
              btnRef={btnRef}
              onOpenSidebar={onOpen}
              onOpenSearch={onOpenSearch}
            />

            <Flex as="main" direction="row" height="100%">
              <Sidebar
                logout={logout}
                btnRef={btnRef}
                isOpen={isOpen}
                onClose={onClose}
              />
              {children}
            </Flex>
          </Stack>
        </ChakraProvider>
      </PrivateRoute>
    </FirebaseProvider>
  )
}

export function Header(props: HeaderProps) {
  const { onOpenSidebar, onOpenSearch, btnRef } = props
  const { desktop } = useMediaQueryContext()

  return (
    <Flex
      align="center"
      paddingY="2"
      paddingX={desktop ? '6' : '1'}
      justify="space-between"
      direction="row"
      height="56px"
      bg="teal"
    >
      {desktop ? (
        <>
          <Heading color="white">Inhaí</Heading>
          {!!onOpenSearch && (
            <Flex width="100%" justify="center">
              <Button
                onClick={onOpenSearch}
                colorScheme="whiteAlpha"
                width="256px"
                color="whitesmoke"
              >
                Buscar Local
              </Button>
            </Flex>
          )}
        </>
      ) : (
        <>
          <IconButton
            ref={btnRef as any}
            onClick={onOpenSidebar}
            size="lg"
            aria-label="LeftNav button"
            icon={<HamburgerIcon boxSize="6" />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          {!!onOpenSearch && (
            <IconButton
              size="lg"
              aria-label="Search button"
              icon={<SearchIcon />}
              variant="ghost"
              colorScheme="whiteAlpha"
              onClick={onOpenSearch}
            />
          )}
        </>
      )}
    </Flex>
  )
}

export interface HeaderProps {
  onOpenSidebar: () => void
  onOpenSearch?: () => void
  btnRef: React.MutableRefObject<undefined>
}

export interface LayoutProps {
  children?: ReactNode
  onOpenSearch?: () => void
}
