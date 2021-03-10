import React from 'react'
import { Router } from '@reach/router'
import MapPage from '../templates/MapPage'
import NotificationsPage from '../templates/NotificationsPage'
import RatingsPage from '../templates/RatingsPage'
import SettingsPage from '../templates/SettingsPage'
import { MediaQueryProvider } from '../components/MediaQuery/context'
import { useMediaQuery } from '@chakra-ui/react'
import ProfilePage from '../templates/ProfilePage'

const App = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')

  return (
    <MediaQueryProvider desktop={desktop}>
      <title>App</title>
      <Router basepath="/app">
        <MapPage path="/map" />
        <NotificationsPage path="/notifications" />
        <RatingsPage path="/ratings" />
        <ProfilePage path="/profile" />
        <SettingsPage path="/settings" />
      </Router>
    </MediaQueryProvider>
  )
}

export default App
