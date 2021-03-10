import { useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'
import { Welcome } from '../components'

import { Layout } from '../components/Layout'
import { MediaQueryProvider } from '../components/MediaQuery/context'

// markup
const IndexPage = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')

  return (
    <MediaQueryProvider desktop={desktop}>
      <Layout>
        <title>Inhai</title>
        <Welcome />
      </Layout>
    </MediaQueryProvider>
  )
}

export default IndexPage
