import {
  Button,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
  extendTheme,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { Sidebar } from './Sidebar'
import { useMediaQueryContext } from '../contexts'
import PrivateRoute from './PrivateRoute'
import { useAuth } from '../contexts/firebase'
import theme from '../theme'

export function Layout({ children, onOpenSearch }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { logout } = useAuth()
  const btnRef = React.useRef()

  return (
    <PrivateRoute path="/login">
      <ChakraProvider theme={extendTheme(theme)}>
        <Stack
          h="100vh"
          maxHeight="-webkit-fill-available"
          direction="column"
          spacing="0"
          overflowY="hidden"
        >
          <Header
            btnRef={btnRef}
            onOpenSidebar={onOpen}
            onOpenSearch={onOpenSearch}
          />

          <Flex
            as="main"
            direction="row"
            bg="white"
            height="calc(100vh - 56px)"
            maxHeight="-webkit-fill-available"
          >
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
  )
}

export function Header(props: HeaderProps) {
  const { onOpenSidebar, onOpenSearch, btnRef } = props
  const { desktop } = useMediaQueryContext()

  return (
    <Flex
      align="center"
      paddingY="2"
      paddingLeft={desktop ? '6' : '1'}
      paddingRight={desktop ? '2' : '1'}
      justify="space-between"
      direction="row"
      height="56px"
      bg="teal.500"
    >
      {desktop ? (
        <Heading color="white">Inhaí</Heading>
      ) : (
        <IconButton
          ref={btnRef as any}
          onClick={onOpenSidebar}
          size="lg"
          aria-label="LeftNav button"
          icon={<HamburgerIcon boxSize="6" />}
          variant="ghost"
          colorScheme="whiteAlpha"
        />
      )}
      {!!onOpenSearch &&
        (desktop ? (
          <Button
            size="lg"
            aria-label="Search button"
            leftIcon={<SearchIcon />}
            variant="ghost"
            padding={4}
            colorScheme="whiteAlpha"
            onClick={onOpenSearch}
          >
            Buscar por local
          </Button>
        ) : (
          <IconButton
            size="lg"
            aria-label="Search button"
            icon={<SearchIcon />}
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={onOpenSearch}
          />
        ))}
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
