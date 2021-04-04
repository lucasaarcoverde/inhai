import React from 'react'
import { Router, Redirect } from '@reach/router'
import MapPage from '../templates/MapPage'
import RatingsPage from '../templates/RatingsPage'
import { FirebaseProvider, MediaQueryProvider } from '../contexts'
import { useMediaQuery } from '@chakra-ui/react'
import ProfilePage from '../templates/ProfilePage'
import { Seo } from '../components'
import LoadingPage from '../templates/LoadingPage'
import HomePage from '../templates/Home'
import AboutUsPage from '../templates/AboutUsPage'
import AdminPage from '../templates/AdminPage'

const App = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')
  const [mobile] = useMediaQuery('(max-width: 720px)')

  return (
    <FirebaseProvider>
      <MediaQueryProvider mobile={mobile} desktop={desktop}>
        <Seo />
        <Router>
          <HomePage path="/app/" />
          <AboutUsPage path="/app/about-us" />
          <LoadingPage path="/app/loading" />
          <MapPage path="/app/map" />
          <RatingsPage path="/app/ratings" />
          <ProfilePage path="/app/profile" />
          <AdminPage path="/app/admin" />
          <Redirect noThrow from="*" to="/404" />
        </Router>
      </MediaQueryProvider>
    </FirebaseProvider>
  )
}

export default App
