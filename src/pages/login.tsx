import { Center, ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'

import { Login, PageWrapper } from '../components'
import { FirebaseProvider } from '../contexts'

const LoginPage = () => {
  return (
    <FirebaseProvider>
      <ChakraProvider>
        <Center as="main" height="100vh" overflowY="hidden">
          <PageWrapper />
          <title>Map</title>
          <Login />
        </Center>
      </ChakraProvider>
    </FirebaseProvider>
  )
}

export default LoginPage
