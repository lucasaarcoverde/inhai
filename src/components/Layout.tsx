import {
  Button,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { PageWrapper } from './PageWrapper'

import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { Sidebar } from './Sidebar'

export function Layout({ children, onOpenSearch }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [desktop] = useMediaQuery('(min-width: 1024px)')

  const btnRef = React.useRef()

  return (
    <ChakraProvider>
      <PageWrapper />
      <Stack h="100vh" direction="column" spacing="0">
        <Header
          btnRef={btnRef}
          onOpenSidebar={onOpen}
          onOpenSearch={onOpenSearch}
          desktop={desktop}
        />

        <Stack as="main" h="100%" direction="row">
          <Sidebar
            btnRef={btnRef}
            isOpen={isOpen}
            onClose={onClose}
            desktop={desktop}
          />
          {children}
        </Stack>
      </Stack>
    </ChakraProvider>
  )
}

export function Header(props: HeaderProps) {
  const { onOpenSidebar, onOpenSearch, btnRef, desktop } = props

  return (
    <Flex
      align="center"
      paddingY="2"
      paddingX={desktop ? '6' : '1'}
      justify="space-between"
      direction="row"
      height="56px"
      bg="blue.500"
    >
      {desktop ? (
        <>
          <Heading color="white">Inhai</Heading>
          {!!onOpenSearch && (
            <Flex width="100vw" justify="center">
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
  desktop: boolean
}

export interface LayoutProps {
  children?: ReactNode
  onOpenSearch?: () => void
}
