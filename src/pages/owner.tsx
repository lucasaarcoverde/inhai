import { useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'
import { Seo } from '../components'

import { MediaQueryProvider } from '../contexts'
import { FirebaseProvider } from '../contexts/firebase'
import 'firebase/firestore'
import OwnerPage from '../templates/OwnerPage'

// markup
const IndexPage = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')
  const [mobile] = useMediaQuery('(max-width: 720px)')

  return (
    <FirebaseProvider>
      <MediaQueryProvider mobile={mobile} desktop={desktop}>
        <Seo />
        <OwnerPage />
      </MediaQueryProvider>
    </FirebaseProvider>
  )
}

export default IndexPage
