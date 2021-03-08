import {
  ChakraProvider,
  Grid,
  GridItem,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { isMobile } from 'react-device-detect'
import { PageWrapper } from './PageWrapper'
import { LeftNav } from './LeftNav'
import { MobileSidebar } from './MobileSideBar'

import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from 'gatsby'

export function Layout({ children }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const templateColumns = isMobile
    ? '1fr'
    : { sm: '4fr 10fr', md: '4fr 8fr', lg: '2fr 10fr', xl: '2fr 12fr' }

  const btnRef = React.useRef()

  return (
    <ChakraProvider>
      <PageWrapper />
      <Grid h="100vh" templateRows="1fr 11fr" templateColumns={templateColumns}>
        <GridItem rowSpan={1} bg="blue.700">
          <Header btnRef={btnRef} onOpen={onOpen} />
        </GridItem>
        <GridItem rowSpan={1} bg="blue.700" />
        {!isMobile && (
          <GridItem>
            <LeftNav />
          </GridItem>
        )}
        <GridItem colSpan={isMobile ? 2 : 1}>
          <main>{children}</main>
        </GridItem>
      </Grid>
      <MobileSidebar btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
    </ChakraProvider>
  )
}

export function Header(props: HeaderProps) {
  const { onOpen, btnRef } = props

  return (
    <Stack
      align="center"
      paddingY="2"
      paddingX="1"
      spacing="2"
      direction="row"
      height="100%"
    >
      {isMobile && (
        <IconButton
          ref={btnRef as any}
          onClick={onOpen}
          size="lg"
          aria-label="LeftNav button"
          icon={<HamburgerIcon boxSize="6" />}
          variant="ghost"
          colorScheme="whiteAlpha"
        />
      )}
    </Stack>
  )
}

export interface HeaderProps {
  onOpen: () => void
  btnRef: React.MutableRefObject<undefined>
}

export interface LayoutProps {
  children?: ReactNode
}
