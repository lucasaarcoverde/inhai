import React from 'react'
import { Router, Redirect } from '@reach/router'
import MapPage from '../templates/MapPage'
import RatingsPage from '../templates/RatingsPage'
import {
  FirebaseProvider,
  LayoutProvider,
  MediaQueryProvider,
} from '../contexts'
import { useDisclosure, useMediaQuery } from '@chakra-ui/react'
import ProfilePage from '../templates/ProfilePage'
import { Layout, Seo } from '../components'
import AboutUsPage from '../templates/AboutUsPage'
import AdminPage from '../templates/AdminPage'

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
      <MediaQueryProvider mobile={mobile} desktop={desktop}>
        <LayoutProvider
          onOpenSearch={onOpenSearch}
          searchOpen={searchOpen}
          onCloseSearch={onCloseSearch}
        >
          <Layout>
            <Seo />
            <Router>
              <MapPage path="/app" />
              <AboutUsPage path="/app/about-us" />
              <RatingsPage path="/app/ratings" />
              <ProfilePage path="/app/profile" />
              <AdminPage path="/app/admin" />
              <Redirect noThrow from="*" to="/404" />
            </Router>
          </Layout>
        </LayoutProvider>
      </MediaQueryProvider>
    </FirebaseProvider>
  )
}

export default App
