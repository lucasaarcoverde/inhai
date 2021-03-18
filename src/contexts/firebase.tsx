import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

import { useEffect } from 'react'
import { navigate } from 'gatsby'

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

export interface User {
  age?: number
  name?: string
  email: string
  photo?: string
  sexualOrientation?: string
  pronoun?: string
}

export interface FirebaseContextData {
  firebase: typeof firebase
  user?: User
  authToken?: string
  loading?: boolean
  setAuthToken: (authToken: string) => void
  setLoading: (loading: boolean) => void
  loginWithGoogle: () => void
}

export const FirebaseContext = createContext<FirebaseContextData>({
  firebase,
  setAuthToken: () => {},
  setLoading: () => {},
  loginWithGoogle: () => {},
})

export function useAuth() {
  const context = useContext(FirebaseContext)

  if (!context)
    throw Error('You are trying to use firebase outside of context!')

  return context
}

export const FirebaseProvider: React.FC = ({ children }) => {
  const authToken =
    typeof window === 'object'
      ? window.localStorage.getItem('authToken')
      : undefined

  const initialState = { loading: false, authToken: authToken ?? undefined }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const loginWithGoogle = useCallback(() => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    return firebase
      .auth()
      .signInWithRedirect(googleProvider)
      .catch(() => {
        navigate('/login')
      })
  }, [firebase])

  const usersRef = useCallback(
    (db: firebase.firestore.Firestore) => db.collection('users'),
    []
  )

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  const onSetAuthToken = useCallback((authToken: string) => {
    dispatch({ type: 'set_authToken', authToken })
    localStorage.setItem('authToken', authToken)
  }, [])

  const onSetUser = useCallback((user: User) => {
    dispatch({ type: 'set_user', user })
  }, [])

  const onSetLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'set_loading', loading })
  }, [])

  useEffect(() => {
    if (typeof window === 'object' && !authToken) {
      const token = window.localStorage.getItem('authToken')

      if (token) {
        onSetAuthToken(token)
      }
    }
  }, [authToken])

  useEffect(() => {
    if (state.user) return

    const db = firebase.firestore()

    const unsub = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const { refreshToken } = authUser
        onSetAuthToken(refreshToken)
        const usersDoc = usersRef(db).doc(`${authUser.email}`)

        usersDoc.get().then((doc) => {
          if (doc.exists) {
            const userDb = doc.data() as User
            onSetUser(userDb)
          } else {
            const userDb = {
              name: authUser.displayName,
              photo: authUser.photoURL,
              email: authUser.email,
            } as User

            usersDoc.set(userDb)

            onSetUser(userDb)
          }
        })
      }
    })

    return unsub
  }, [state.user, usersRef, onSetAuthToken, firebase])

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        authToken: state.authToken,
        user: state.user,
        loading: state.loading,
        setAuthToken: onSetAuthToken,
        setLoading: onSetLoading,
        loginWithGoogle,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

function authReducer(
  state: AuthContextState,
  action: Action
): AuthContextState {
  switch (action.type) {
    case 'set_loading': {
      return { ...state, loading: action.loading }
    }
    case 'set_user': {
      return { ...state, user: action.user }
    }
    case 'set_authToken': {
      return { ...state, authToken: action.authToken }
    }
    default:
      throw new Error('Auth Reducer: Unsupported action type')
  }
}

export type AuthContextState = {
  loading?: boolean
  user?: User
  authToken?: string
}

type Action =
  | {
      type: 'set_loading'
      loading: boolean
    }
  | { type: 'set_user'; user: User }
  | { type: 'set_authToken'; authToken: string }