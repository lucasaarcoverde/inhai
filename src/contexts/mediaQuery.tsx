import React, { createContext, useContext } from 'react'

interface MediaQueryProps {
  desktop: boolean
  mobile: boolean
}

const MediaQueryContext = createContext<MediaQueryProps | null>(null)

export function useMediaQuery() {
  const context = useContext(MediaQueryContext)

  if (!context) throw new Error('useMediaQuery out of context!')

  return context
}

export function MediaQueryProvider(
  props: React.PropsWithChildren<MediaQueryProps>
) {
  const { children, ...restProps } = props
  return (
    <MediaQueryContext.Provider value={restProps}>
      {children}
    </MediaQueryContext.Provider>
  )
}
