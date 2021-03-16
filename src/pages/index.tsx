import { useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'
import { PageWrapper, Welcome } from '../components'

import { Layout } from '../components/Layout'
import { MediaQueryProvider } from '../contexts'
import { useAuth } from '../contexts/firebase'
import 'firebase/firestore'

// markup
const IndexPage = () => {
  const [desktop] = useMediaQuery('(min-width: 1024px)')
  const { firebase } = useAuth()
  React.useEffect(() => {
    const db = firebase.firestore()
    console.log('hey o')
    try {
      db.collection('users')
        .doc('user')
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data())
          }
        })
    } catch (e) {
      console.log(e)
    }
  }, [])

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
