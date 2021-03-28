import { useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'
import { PageWrapper, Welcome } from '../components'

import { Layout } from '../components/Layout'
import { MediaQueryProvider } from '../contexts'
import { FirebaseProvider } from '../contexts/firebase'
import 'firebase/firestore'

// markup
const IndexPage = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')

  return (
    <FirebaseProvider>
      <MediaQueryProvider desktop={desktop}>
        <Layout>
          <PageWrapper />
          <title>Inhai</title>
        </Layout>
      </MediaQueryProvider>
    </FirebaseProvider>
  )
}

export default IndexPage
