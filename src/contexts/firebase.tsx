import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import firebase from 'firebase/app'
import { v4 } from 'uuid'
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
  displayName?: string
  email: string
  photo?: string
  sexualOrientation?: string
  genderIdentity?: string
  pronoun?: string
  id: string
}

export interface FirebaseContextData {
  firebase: typeof firebase
  user?: User
  loading?: boolean
  setLoading: (loading: boolean) => void
  setUser: (user: User) => void
  logout: () => void
  loginWithGoogle: () => void
  usersRef?: (
    db: firebase.firestore.Firestore
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
}

export const FirebaseContext = createContext<FirebaseContextData>({
  firebase,
  setLoading: () => {},
  setUser: () => {},
  logout: () => {},
  loginWithGoogle: () => {},
})

export function useAuth() {
  const context = useContext(FirebaseContext)

  if (!context)
    throw Error('You are trying to use firebase outside of context!')

  return context
}

export const FirebaseProvider: React.FC = ({ children }) => {
  const initialState = { loading: false }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login')
      })
  }, [])

  const loginWithGoogle = useCallback(() => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        return firebase
          .auth()
          .signInWithRedirect(googleProvider)
          .catch(() => {
            navigate('/login')
          })
          .then(() => {
            navigate('/app/loading')
          })
      })
  }, [firebase])

  const usersRef = useCallback(
    (db: firebase.firestore.Firestore) => db.collection('users'),
    []
  )

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  const onSetUser = useCallback((user: User) => {
    dispatch({ type: 'set_user', user })
  }, [])

  const onSetLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'set_loading', loading })
  }, [])

  const userAuthenticated = useMemo(() => {
    if (!state.user) return {} as User

    return state.user
  }, [state.user])

  useEffect(() => {
    if (state.user) return

    const db = firebase.firestore()

    const unsub = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const { refreshToken } = authUser
        usersRef(db)
          .where('email', '==', authUser.email)
          .limit(1)
          .get()
          .then((res) => {
            if (!res.empty) {
              const [doc] = res.docs

              if (doc.exists) {
                const userDb = doc.data() as User

                onSetUser(userDb)
              }
            } else {
              const uuid = v4()
              const userDb = {
                name: authUser.displayName,
                displayName: authUser.displayName,
                photo: authUser.photoURL,
                email: authUser.email,
                id: uuid,
              } as User
              usersRef(db).doc(uuid).set(userDb)

              onSetUser(userDb)
            }
          })
          .catch((e) => console.log(e))
      } else {
        console.log('not logged')
      }
    })

    return unsub
  }, [state.user, usersRef, firebase])

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user: userAuthenticated,
        loading: state.loading,
        setLoading: onSetLoading,
        setUser: onSetUser,
        usersRef,
        loginWithGoogle,
        logout,
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
    default:
      throw new Error('Auth Reducer: Unsupported action type')
  }
}

export type AuthContextState = {
  loading?: boolean
  user?: User
}

type Action =
  | {
      type: 'set_loading'
      loading: boolean
    }
  | { type: 'set_user'; user: User }
