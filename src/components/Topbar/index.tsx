import React from 'react'

import { useMediaQuery } from '../../contexts'
import { DesktopTopbar } from './DesktopTopbar'
import { MobileTopbar } from './MobileTopbar'

export function Topbar(props: TopbarProps) {
  const { desktop } = useMediaQuery()

  return desktop ? <DesktopTopbar {...props} /> : <MobileTopbar {...props} />
}

export interface TopbarProps {
  photo?: string
}
