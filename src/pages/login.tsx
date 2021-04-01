import { Center } from '@chakra-ui/react'
import * as React from 'react'

import { Login, Seo } from '../components'
import { FirebaseProvider } from '../contexts'

const LoginPage = () => {
  return (
    <FirebaseProvider>
      <Center
        as="main"
        height="100vh"
        maxHeight="-webkit-fill-available"
        overflowY="hidden"
      >
        <Seo />
        <Login />
      </Center>
    </FirebaseProvider>
  )
}

export default LoginPage
