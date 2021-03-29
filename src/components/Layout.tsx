import {
  Button,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
  extendTheme,
  Grid,
  Icon,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import { Sidebar } from './Sidebar'
import { useMediaQueryContext } from '../contexts'
import PrivateRoute from './PrivateRoute'
import { useAuth } from '../contexts/firebase'
import theme from '../theme'
import { navigate, useLocation } from '@reach/router'
import { HiLogout } from 'react-icons/hi'

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
            overflowY="scroll"
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
  const { onOpenSearch, btnRef } = props
  const { desktop } = useMediaQueryContext()
  const { pathname } = useLocation()
  const { logout } = useAuth()

  return (
    <Grid
      templateColumns={desktop ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
      paddingLeft={desktop ? '6' : '1'}
      paddingRight={desktop ? '2' : '1'}
      direction="row"
      height="56px"
      width="100vw"
      bg="teal.500"
    >
      {!desktop && (
        <Flex h="100%" align="center" justifyContent="flex-start">
          {pathname !== '/app/' && (
            <IconButton
              ref={btnRef as any}
              onClick={() => navigate('/app/')}
              size="lg"
              aria-label="LeftNav button"
              icon={<ArrowBackIcon boxSize="6" />}
              variant="ghost"
              colorScheme="whiteAlpha"
            />
          )}
        </Flex>
      )}
      <Flex
        h="100%"
        align="center"
        justifyContent={desktop ? 'flex-start' : 'center'}
      >
        <Heading color="white">Inhaí</Heading>
      </Flex>
      <Flex h="100%" align="center" justifyContent="flex-end">
        {!!onOpenSearch ? (
          desktop ? (
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
          )
        ) : (
          pathname === '/app/' && (
            <IconButton
              size="lg"
              aria-label="Search button"
              icon={<Icon as={HiLogout} boxSize="6" />}
              variant="ghost"
              colorScheme="whiteAlpha"
              onClick={logout}
            />
          )
        )}
      </Flex>
    </Grid>
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
