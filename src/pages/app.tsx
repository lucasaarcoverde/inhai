import React from 'react'
import { Router } from '@reach/router'
import MapPage from '../templates/MapPage'
import NotificationsPage from '../templates/NotificationsPage'
import RatingsPage from '../templates/RatingsPage'
import SettingsPage from '../templates/SettingsPage'
import { Layout } from '../components/Layout'

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <MapPage path="/map" />
        <NotificationsPage path="/notifications" />
        <RatingsPage path="/ratings" />
        <SettingsPage path="/settings" />
      </Router>
    </Layout>
  )
}

export default App
