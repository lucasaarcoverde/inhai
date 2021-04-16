import { Center } from '@chakra-ui/react'
import * as React from 'react'

import { Login, Seo } from '../components'
import { FirebaseProvider } from '../contexts'
import { VerifiedContextProvider } from '../contexts/verified'

const LoginPage = () => {
  return (
    <FirebaseProvider>
      <VerifiedContextProvider>
        <Center
          as="main"
          height="100vh"
          maxHeight="-webkit-fill-available"
          overflowY="hidden"
        >
          <Seo />
          <Login />
        </Center>
      </VerifiedContextProvider>
    </FirebaseProvider>
  )
}

export default LoginPage
