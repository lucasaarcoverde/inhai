import React, { useState } from 'react'
import {
  Button,
  Divider,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Link,
  Heading,
  Center,
} from '@chakra-ui/react'

import { FcGoogle } from 'react-icons/fc'

import { navigate } from 'gatsby'
import { useAuth } from '../../contexts/firebase'
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export type AuthError = Error

export const Login: React.FC = () => {
  // get the variables we need for authentication.
  const [passwordShown, setPasswordShown] = useState(false)

  const { firebase, authToken, setAuthToken } = useAuth()

  // setup some state variables for login
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  // The method for handling google authentication
  const handleGoogleAuth = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      try {
        event.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()
        // get the credential from the google auth.
        const { credential } = await firebase.auth().signInWithPopup(provider)

        // if we have a credential then get the access token and set it in state.

        if (credential) {
          // This has to be assigned to the oathcredential type so that we can get the accessToken property.

          const { accessToken } = credential as any
          setAuthToken(accessToken as string)
        }
      } catch (e) {
        console.log(e)
      }
    },
    [firebase, setAuthToken]
  )

  // Method for signing up and logging in.
  const handleSignupAndLogin = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      let authError: AuthError | undefined
      try {
        event.preventDefault()
        // Try to create a new user with the email and password.
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        // If successful and we have a user the set the authToken.
        if (user) {
          const { refreshToken } = user
          setAuthToken(refreshToken)
        }
        // If there is an error set the authError to the new error
      } catch (error) {
        authError = error
      } finally {
        // If there is an authError and the code is that the email is already in use, try to sign
        // the user in with the email and password instead.

        if ((authError as any)?.code === 'auth/email-already-in-use') {
          const { user } = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
          // We've been here before... set the authToken if there is a user.

          if (user) {
            const { refreshToken } = user
            setAuthToken(refreshToken)
          }
        }
      }
    },
    [email, password, firebase, setAuthToken]
  )

  // Effect that will reroute the user to the index.tsx file if there is an authToken
  React.useEffect(() => {
    if (authToken) {
      navigate('/')
    }
  }, [authToken])

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={6}>
        <Center padding={6}>
          <Heading color="teal">Inhaí</Heading>
        </Center>
        <Stack>
          <FormControl>
            <label htmlFor="email">Email</label>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<EmailIcon color="gray.300" />}
              />
              <Input
                id="email"
                variant="flushed"
                aria-describedby="email-helper"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <label htmlFor="password">Senha</label>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.300" />}
              />
              <Input
                variant="flushed"
                pr="4.5rem"
                type={passwordShown ? 'text' : 'password'}
                placeholder="Enter password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="password-button"
                  h="1.75rem"
                  variant="ghost"
                  size="sm"
                  onClick={() => setPasswordShown((prev) => !prev)}
                  icon={passwordShown ? <ViewIcon /> : <ViewOffIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Flex justify="flex-end">
            <Text fontSize="xs" colorScheme="gray">
              Novo no nosso app?{' '}
              <Link color="blue.600" fontWeight="bold" fontSize="xs">
                Registrar-se
              </Link>
            </Text>
          </Flex>
        </Stack>

        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          onClick={handleSignupAndLogin}
        >
          Entrar
        </Button>
        <Stack direction="row" align="center" paddingX={4}>
          <Divider />
          <Text textColor="gray.300">ou</Text>
          <Divider />
        </Stack>
        <Button
          leftIcon={<Icon boxSize={6} as={FcGoogle} />}
          type="button"
          variant="ghost"
          size="lg"
          colorScheme="blackAlpha"
          onClick={handleGoogleAuth}
        >
          Entrar com Google
        </Button>
      </Stack>
    </form>
  )
}
