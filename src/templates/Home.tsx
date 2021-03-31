import { RouteComponentProps } from '@reach/router'
import { navigate } from 'gatsby'

import React, { useEffect } from 'react'
import { Layout } from '../components'
import { Home } from '../components/Home'
import { useMediaQueryContext } from '../contexts'

function HomePage(props: React.PropsWithChildren<RouteComponentProps>) {
  const { desktop } = useMediaQueryContext()

  useEffect(() => {
    if (desktop === true) navigate('/app/map')
  }, [desktop])

  return (
    <Layout>
      <title>Home</title>
      {props.children}
      <Home />
    </Layout>
  )
}

export default HomePage
