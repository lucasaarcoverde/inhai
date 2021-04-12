import { Box } from '@chakra-ui/react'
import React, { ReactNode, useMemo } from 'react'

import PrivateRoute from './PrivateRoute'
import { Topbar } from './Topbar'
import { useMediaQuery } from '../contexts'
import 'focus-visible/dist/focus-visible'
import { DefaultFooter, MobileFooter } from './Footer'
import { useLocation } from '@reach/router'
import { useAuth } from '../contexts/firebase'
import { InitialLoading } from './Loading'

export function Layout({ children }: LayoutProps) {
  const { desktop } = useMediaQuery()
  const { pathname } = useLocation()
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
              marginTop="56px"
              maxHeight="-webkit-fill-available"
              height="calc(100vh - 120px)"
              bg="white"
              overflowX="hidden"
              as="main"
            >
              {children}
              {!pathname.includes('profile') && <DefaultFooter />}
            </Box>
          ) : (
            <Box
              as="main"
              paddingTop="56px"
              height="calc(100vh - 64px)"
              maxHeight="-webkit-fill-available"
              overflowY="scroll"
              bg="white"
              width="100vw"
              overflowX="hidden"
            >
              {children}
            </Box>
          )}

          {!desktop && <MobileFooter photo={photo} />}
        </>
      )}
    </PrivateRoute>
  )
}
export interface LayoutProps {
  children?: ReactNode
  onOpenSearch?: () => void
}
