import React from 'react'
import { useMediaQueryContext } from '../../contexts'
import { DesktopTopbar } from './DesktopTopbar'
import { MobileTopbar } from './MobileTopbar'

export function Topbar(props: TopbarProps) {
  const { desktop } = useMediaQueryContext()

  return desktop ? <DesktopTopbar /> : <MobileTopbar {...props} />
}
export interface TopbarProps {
  onOpenSearch?: () => void
  btnRef?: React.MutableRefObject<undefined>
}
