import React, { createContext, useContext } from 'react'
import { HereItem } from '../hooks/useHere'

interface MapContextProps {
  items?: HereItem[]
}

const MapContext = createContext<MapContextProps | null>(null)

export function useMap() {
  const context = useContext(MapContext)

  if (!context) throw new Error('useMap out of context')

  return context
}

export function MapProvider(props: React.PropsWithChildren<MapContextProps>) {
  const { children, ...restProps } = props
  return <MapContext.Provider value={restProps}>{children}</MapContext.Provider>
}
