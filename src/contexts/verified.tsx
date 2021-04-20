import React, { createContext, useContext, useEffect, useState } from 'react'

import { useAuth } from './firebase'

interface VerifiedProps {
  verified?: boolean
}

const VerifiedContext = createContext<VerifiedProps | null>(null)

export function useVerified() {
  const context = useContext(VerifiedContext)

  if (!context) throw new Error('useVerified out of context!')

  return context
}

export function VerifiedContextProvider(
  props: React.PropsWithChildren<VerifiedProps>
) {
  const { children, ...restProps } = props

  const [verified, setVerified] = useState(false)
  const { firebase } = useAuth()

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (!user) return
      setVerified(user.emailVerified)
    })

    return unsub
  }, [firebase])

  return (
    <VerifiedContext.Provider value={{ ...restProps, verified }}>
      {children}
    </VerifiedContext.Provider>
  )
}
