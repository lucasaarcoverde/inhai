import { Center, ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as React from 'react'

import { Login, Seo } from '../components'
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
          <Seo />
          <Login />
        </Center>
      </ChakraProvider>
    </FirebaseProvider>
  )
}

export default LoginPage
