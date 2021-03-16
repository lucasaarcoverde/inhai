import React from 'react'
import { Button, FormControl, FormHelperText, Input } from '@chakra-ui/react'

import { navigate } from 'gatsby'
import { useAuth } from '../../contexts/firebase'

export type AuthError = Error

export const Login: React.FC = () => {
  // get the variables we need for authentication.

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
      <FormControl>
        <label htmlFor="email">Email address</label>
        <Input
          id="email"
          aria-describedby="email-helper"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <FormHelperText id="email-helper">
          We&apos;ll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
        onClick={handleSignupAndLogin}
      >
        Login / Sign Up
      </Button>
      <Button
        type="button"
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
        onClick={handleGoogleAuth}
      >
        Login With Google
      </Button>
    </form>
  )
}
