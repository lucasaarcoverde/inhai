import { useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'
import { PageWrapper, Welcome } from '../components'

import { Layout } from '../components/Layout'
import { MediaQueryProvider } from '../contexts'

// markup
const IndexPage = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')

  return (
    <MediaQueryProvider desktop={desktop}>
      <Layout>
        <PageWrapper />
        <title>Inhai</title>
        <Welcome />
      </Layout>
    </MediaQueryProvider>
  )
}

export default IndexPage
