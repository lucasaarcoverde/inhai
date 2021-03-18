import React from 'react'
import { Router, Redirect } from '@reach/router'
import MapPage from '../templates/MapPage'
import NotificationsPage from '../templates/NotificationsPage'
import RatingsPage from '../templates/RatingsPage'
import SettingsPage from '../templates/SettingsPage'
import { FirebaseProvider, MediaQueryProvider } from '../contexts'
import { useMediaQuery } from '@chakra-ui/react'
import ProfilePage from '../templates/ProfilePage'
import { PageWrapper } from '../components'
import LoadingPage from '../templates/LoadingPage'

const App = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')

  return (
    <FirebaseProvider>
      <MediaQueryProvider desktop={desktop}>
        <title>App</title>
        <PageWrapper />
        <Router>
          <LoadingPage path="/app/loading" />
          <MapPage path="/app/map" />
          <NotificationsPage path="/app/notifications" />
          <RatingsPage path="/app/ratings" />
          <ProfilePage path="/app/profile" />
          <SettingsPage path="/app/settings" />
          <Redirect noThrow from="*" to="/404" />
        </Router>
      </MediaQueryProvider>
    </FirebaseProvider>
  )
}

export default App
