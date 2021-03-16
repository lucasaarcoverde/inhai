import React, { createContext, useContext } from 'react'
import firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firestore'

// Your config that you stored in the env file.
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_APIKEY,
  appId: process.env.GATSBY_FIREBASE_APPID,
  authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENTID,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGINGSENDERID,
  projectId: process.env.GATSBY_FIREBASE_PROJECTID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET,
}

// The type definition for the firebase context data.

export interface FirebaseContextData {
  isInitialized: boolean
  firebase: typeof firebase
  authToken: string | null
  setAuthToken: (authToken: string) => void
}
// The firebase context that will store the firebase instance and other useful variables.

export const FirebaseContext = createContext<FirebaseContextData>({
  authToken: null,
  firebase,
  isInitialized: false,
  setAuthToken: () => {},
})

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithRedirect(googleProvider)
}

export function useAuth() {
  const context = useContext(FirebaseContext)

  if (!context)
    throw Error('You are trying to use firebase outside of context!')

  return context
}
// The provider that will store the logic for manipulating the firebase instance and variables.

export const FirebaseProvider: React.FC = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false)

  // If we have a window and the authToken already exists in localstorage then initialize the authToken value otherwise null.

  const [authToken, setAuthToken] = React.useState<
    FirebaseContextData['authToken']
  >(
    typeof window === 'object' ? window.localStorage.getItem('authToken') : null
  )

  // If firebase has not been initialized then initialize it.

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    setIsInitialized(true)
  }

  // A method for setting the authToken in state and local storage.
  const onSetAuthToken = (token: string) => {
    setAuthToken(token)
    localStorage.setItem('authToken', token)
  }

  // If we have the window object and there is no authToken then try to get the authToken from local storage.
  React.useEffect(() => {
    if (typeof window === 'object' && !authToken) {
      const token = window.localStorage.getItem('authToken')

      if (token) {
        onSetAuthToken(token)
      }
    }
  }, [authToken])

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        authToken,
        isInitialized,
        setAuthToken: onSetAuthToken,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
