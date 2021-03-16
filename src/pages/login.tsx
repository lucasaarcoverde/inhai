import { Center, ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'

import { Login, PageWrapper } from '../components'
import { FirebaseProvider } from '../contexts'

const LoginPage = () => {
  return (
    <React.Fragment>
      <FirebaseProvider>
        <ChakraProvider>
          <Center as="main" height="100vh">
            <PageWrapper />
            <title>Map</title>
            <Login />
          </Center>
        </ChakraProvider>
      </FirebaseProvider>
    </React.Fragment>
  )
}

export default LoginPage
