import React from 'react'
import { Router, Redirect } from '@reach/router'
import { useDisclosure, useMediaQuery } from '@chakra-ui/react'

import MapPage from '../templates/MapPage'
import RatingsPage from '../templates/RatingsPage'
import {
  FirebaseProvider,
  LayoutProvider,
  MediaQueryProvider,
} from '../contexts'
import ProfilePage from '../templates/ProfilePage'
import { Layout, Seo } from '../components'
import AboutPage from '../templates/AboutPage'
import AdminPage from '../templates/AdminPage'
import { VerifiedContextProvider } from '../contexts/verified'
import HomePage from '../templates/HomePage'

const App = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')
  const [mobile] = useMediaQuery('(max-width: 720px)')
  const {
    onOpen: onOpenSearch,
    isOpen: searchOpen,
    onClose: onCloseSearch,
  } = useDisclosure()

  return (
    <FirebaseProvider>
      <VerifiedContextProvider>
        <MediaQueryProvider mobile={mobile} desktop={desktop}>
          <LayoutProvider
            onOpenSearch={onOpenSearch}
            searchOpen={searchOpen}
            onCloseSearch={onCloseSearch}
          >
            <Layout>
              <Seo />
              <Router>
                <HomePage path="/app" />
                <MapPage path="/app/map" />
                <AboutPage path="/app/about" />
                <RatingsPage path="/app/ratings" />
                <ProfilePage path="/app/profile" />
                <AdminPage path="/app/admin" />
                <Redirect noThrow from="*" to="/404" />
              </Router>
            </Layout>
          </LayoutProvider>
        </MediaQueryProvider>
      </VerifiedContextProvider>
    </FirebaseProvider>
  )
}

export default App
