import React from 'react'
import { DesktopSidebar, DesktopSidebarProps } from './DesktopSidebar'

type SidebarProps = DesktopSidebarProps

export function Sidebar(props: SidebarProps) {
  return <DesktopSidebar {...props} />
}
