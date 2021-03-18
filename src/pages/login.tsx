import { Center, ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as React from 'react'

import { Login, PageWrapper } from '../components'
import { FirebaseProvider } from '../contexts'
import theme from '../theme'

const LoginPage = () => {
  return (
    <FirebaseProvider>
      <ChakraProvider theme={extendTheme(theme)}>
        <Center
          as="main"
          height="100vh"
          maxHeight="-webkit-fill-available"
          overflowY="hidden"
        >
          <PageWrapper />
          <title>Login</title>
          <Login />
        </Center>
      </ChakraProvider>
    </FirebaseProvider>
  )
}

export default LoginPage
