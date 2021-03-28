import { useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'
import { PageWrapper } from '../components'

import { Layout } from '../components/Layout'
import { MediaQueryProvider } from '../contexts'
import { FirebaseProvider } from '../contexts/firebase'
import 'firebase/firestore'
import { navigate } from 'gatsby'

// markup
const IndexPage = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')
  const [mobile] = useMediaQuery('(max-width: 720px)')

  React.useEffect(() => {
    navigate('/app/map')
  }, [])
  return (
    <FirebaseProvider>
      <MediaQueryProvider mobile={mobile} desktop={desktop}>
        <Layout>
          <PageWrapper />
          <title>Inhai</title>
        </Layout>
      </MediaQueryProvider>
    </FirebaseProvider>
  )
}

export default IndexPage
