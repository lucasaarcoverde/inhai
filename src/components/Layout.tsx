import { Flex, Stack, Grid } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { Sidebar } from './Sidebar'
import PrivateRoute from './PrivateRoute'
import { Topbar } from './Topbar'
import { useMediaQueryContext } from '../contexts'
import 'focus-visible/dist/focus-visible'
import { DefaultFooter } from './Footer'
import { useLocation } from '@reach/router'

export function Layout({ children, onOpenSearch }: LayoutProps) {
  const { desktop } = useMediaQueryContext()
  const { pathname } = useLocation()

  return (
    <PrivateRoute path="/login">
      <Stack
        h="100vh"
        maxHeight="-webkit-fill-available"
        direction="column"
        spacing="0"
        overflowY={desktop ? 'hidden' : 'scroll'}
      >
        <Topbar onOpenSearch={onOpenSearch} />
        {desktop ? (
          <Grid
            paddingTop="56px"
            width="100%"
            height="100%"
            templateColumns="1fr 2fr 1fr"
            bg="white"
          >
            <Sidebar />
            {children}
            {!pathname.includes('profile') && <DefaultFooter />}
          </Grid>
        ) : (
          <Flex
            as="main"
            direction="row"
            bg="whiteAlpha"
            paddingTop="56px"
            width="100%"
            height="100%"
          >
            {children}
          </Flex>
        )}
      </Stack>
    </PrivateRoute>
  )
}
export interface LayoutProps {
  children?: ReactNode
  onOpenSearch?: () => void
}
