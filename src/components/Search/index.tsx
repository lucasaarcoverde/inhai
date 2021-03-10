import React from 'react'
import { useMediaQueryContext } from '../MediaQuery/context'
import { DesktopSearch } from './DesktopSearch'
import { MobileSearch } from './MobileSearch'

export function Search(props: SearchProps) {
  const { ...restProps } = props

  const { desktop } = useMediaQueryContext()

  return desktop ? (
    <DesktopSearch {...restProps} />
  ) : (
    <MobileSearch {...restProps} />
  )
}

export interface SearchProps {
  isSearchOpen: boolean
  onCloseSearch: () => void
}
