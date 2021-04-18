import type { ReactNode } from 'react'
import React, { useMemo } from 'react'
import { Box } from '@chakra-ui/react'

import PrivateRoute from './PrivateRoute'
import { Topbar } from './Topbar'
import { useMediaQuery } from '../contexts'
import 'focus-visible/dist/focus-visible'
import { DefaultFooter, MobileFooter } from './Footer'
import { useAuth } from '../contexts/firebase'
import { InitialLoading } from './Loading'

export function Layout({ children }: LayoutProps) {
  const { desktop } = useMediaQuery()
  const { user, loading } = useAuth()

  const photo = useMemo(() => {
    return user?.photo
  }, [user?.photo])

  return (
    <PrivateRoute path="/login">
      {loading ? (
        <InitialLoading />
      ) : (
        <>
          <Topbar />
          {desktop ? (
            <Box
              width="100vw"
              maxHeight="-webkit-fill-available"
              height="calc(100vh - 112px)"
              bg="white"
              overflow="hidden"
              as="main"
            >
              {children}
            </Box>
          ) : (
            <Box
              as="main"
              height="calc(100vh - 112px)"
              maxHeight="-webkit-fill-available"
              overflowY="scroll"
              bg="white"
              width="100vw"
              overflowX="hidden"
            >
              {children}
            </Box>
          )}

          {desktop ? <DefaultFooter /> : <MobileFooter photo={photo} />}
        </>
      )}
    </PrivateRoute>
  )
}

export interface LayoutProps {
  children?: ReactNode
  onOpenSearch?: () => void
}
