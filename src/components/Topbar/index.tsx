import React from 'react'
import { useMediaQuery } from '../../contexts'
import { DesktopTopbar } from './DesktopTopbar'
import { MobileTopbar } from './MobileTopbar'

export function Topbar() {
  const { desktop } = useMediaQuery()

  return desktop ? <DesktopTopbar /> : <MobileTopbar />
}
export interface TopbarProps {
  onOpenSearch?: () => void
  btnRef?: React.MutableRefObject<undefined>
}
