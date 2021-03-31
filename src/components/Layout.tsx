import {
  ChakraProvider,
  Flex,
  Stack,
  extendTheme,
  Grid,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { Sidebar } from './Sidebar'
import PrivateRoute from './PrivateRoute'
import theme from '../theme'
import { Topbar } from './Topbar'
import { useMediaQueryContext } from '../contexts'

export function Layout({ children, onOpenSearch }: LayoutProps) {
  const { desktop } = useMediaQueryContext()
  return (
    <PrivateRoute path="/login">
      <ChakraProvider theme={extendTheme(theme)}>
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
              bg="whiteAlpha"
            >
              <Sidebar />
              {children}
            </Grid>
          ) : (
            <Flex
              as="main"
              direction="row"
              bg="whiteAlpha"
              paddingTop="56px"
              width="100%"
              height="100%"
              justifyContent="center"
            >
              {children}
            </Flex>
          )}
        </Stack>
      </ChakraProvider>
    </PrivateRoute>
  )
}
export interface LayoutProps {
  children?: ReactNode
  onOpenSearch?: () => void
}
