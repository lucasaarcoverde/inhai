import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
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

export type Timestamp = firebase.firestore.Timestamp

export type Collection = 'ratings' | 'places' | 'users' | 'cities' | 'info'

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
  newUser: boolean
  lgbtphobia: boolean
  currentLocation?: { lat: number; lng: number }
}

export interface FirebaseContextData {
  firebase: typeof firebase
  user: User | null
  loading?: boolean
  setLoading: (loading: boolean) => void
  setUser: (user: User) => void
  logout: () => void
  loginWithGoogle: () => void
  loginWithFacebook: () => void
  loginWithTwitter: () => void
  collectionRef?: (
    db: firebase.firestore.Firestore,
    collection: Collection
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
}

export const FirebaseContext = createContext<FirebaseContextData>({
  firebase,
  setLoading: () => {},
  setUser: () => {},
  logout: () => {},
  loginWithGoogle: () => {},
  loginWithFacebook: () => {},
  loginWithTwitter: () => {},
  user: null,
})

export function useAuth() {
  const context = useContext(FirebaseContext)

  if (!context) {
    throw Error('You are trying to use firebase outside of context!')
  }

  return context
}

export const FirebaseProvider: React.FC = ({ children }) => {
  const initialState = { loading: false, user: null }

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

        return firebase.auth().signInWithRedirect(googleProvider)
      })
  }, [firebase])

  const loginWithTwitter = useCallback(() => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        const twitterProvider = new firebase.auth.TwitterAuthProvider()

        return firebase.auth().signInWithRedirect(twitterProvider)
      })
  }, [firebase])

  const loginWithFacebook = useCallback(() => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        const facebookProvider = new firebase.auth.FacebookAuthProvider()

        return firebase.auth().signInWithRedirect(facebookProvider)
      })
  }, [firebase])

  const usersRef = useCallback(
    (db: firebase.firestore.Firestore) => db.collection('users'),
    []
  )

  const collectionRef = useCallback(
    (db: firebase.firestore.Firestore, collection: Collection) =>
      db.collection(collection),
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
    if (!state.user) return null

    return state.user
  }, [state.user])

  useEffect(() => {
    if (state.user) return

    let cancelled = false
    const db = firebase.firestore()

    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        usersRef(db)
          .where('id', '==', authUser.uid)
          .limit(1)
          .get()
          .then((res) => {
            if (!res.empty) {
              const [doc] = res.docs

              if (doc.exists) {
                const userDb = doc.data() as User

                if (!cancelled) onSetUser(userDb)
              }
            } else {
              const userDb = {
                name: authUser.displayName,
                displayName: authUser.displayName,
                photo: authUser.photoURL,
                email: authUser.email,
                id: authUser.uid,
                newUser: true,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                lgbtphobia: false,
              } as User

              usersRef(db)
                .doc(authUser.uid)
                .set(userDb)
                .then(() => {
                  db.collection('info')
                    .doc('app-information')
                    .update({
                      users: firebase.firestore.FieldValue.increment(1),
                    })
                })
              if (!cancelled) onSetUser(userDb)
            }
          })
      }
    })

    return () => {
      cancelled = true
    }
  }, [state.user, usersRef, firebase])

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user: userAuthenticated,
        loading: state.loading,
        setLoading: onSetLoading,
        setUser: onSetUser,
        collectionRef,
        loginWithGoogle,
        loginWithFacebook,
        loginWithTwitter,
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
  user: User | null
}

type Action =
  | {
      type: 'set_loading'
      loading: boolean
    }
  | { type: 'set_user'; user: User }
