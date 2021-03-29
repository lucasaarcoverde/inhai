import React from 'react'
import { useMediaQueryContext } from '../../contexts'
import { DesktopSidebar, DesktopSidebarProps } from './DesktopSidebar'

type SidebarProps = DesktopSidebarProps

export function Sidebar(props: SidebarProps) {
  const { desktop } = useMediaQueryContext()

  return desktop ? <DesktopSidebar {...props} /> : <></>
}
