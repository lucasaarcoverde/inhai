import { useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'
import { Seo } from '../components'

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
    navigate('/app')
  }, [])

  return (
    <FirebaseProvider>
      <VerifiedContextProvider>
        <MediaQueryProvider mobile={mobile} desktop={desktop}>
          <Layout>
            <Seo />
          </Layout>
        </MediaQueryProvider>
      </VerifiedContextProvider>
    </FirebaseProvider>
  )
}

export default IndexPage
