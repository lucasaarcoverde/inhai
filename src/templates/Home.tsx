import { RouteComponentProps } from '@reach/router'
import { navigate } from 'gatsby'

import React, { useEffect } from 'react'
import { Layout, Tutorial } from '../components'
import { Home } from '../components/Home'
import { useMediaQuery } from '../contexts'

function HomePage(props: React.PropsWithChildren<RouteComponentProps>) {
  const { desktop } = useMediaQuery()

  useEffect(() => {
    if (desktop === true) navigate('/app/map')
  }, [desktop])

  return (
    <Layout>
      {props.children}
      <Home />
      <Tutorial />
    </Layout>
  )
}

export default HomePage
