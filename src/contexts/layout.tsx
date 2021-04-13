import React, { createContext, useContext } from 'react'

interface LayoutContextProps {
  onOpenSearch: () => void
  searchOpen: boolean
  onCloseSearch: () => void
}

const LayoutContext = createContext<LayoutContextProps | null>(null)

export function useLayout() {
  const context = useContext(LayoutContext)

  if (!context) throw new Error('useLayout out of context')

  return context
}

export function LayoutProvider(
  props: React.PropsWithChildren<LayoutContextProps>
) {
  const { children, ...restProps } = props
  return (
    <LayoutContext.Provider value={restProps}>
      {children}
    </LayoutContext.Provider>
  )
}
