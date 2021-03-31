import { ChakraProvider, Flex, Stack, extendTheme } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { Sidebar } from './Sidebar'
import PrivateRoute from './PrivateRoute'
import theme from '../theme'
import { Topbar } from './Topbar'

export function Layout({ children, onOpenSearch }: LayoutProps) {
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
          <Topbar onOpenSearch={onOpenSearch} />

          <Flex
            as="main"
            direction="row"
            bg="whiteAlpha"
            height="calc(100vh - 56px)"
            overflowY="scroll"
            maxHeight="-webkit-fill-available"
          >
            <Sidebar />
            {children}
          </Flex>
        </Stack>
      </ChakraProvider>
    </PrivateRoute>
  )
}
export interface LayoutProps {
  children?: ReactNode
  onOpenSearch?: () => void
}
