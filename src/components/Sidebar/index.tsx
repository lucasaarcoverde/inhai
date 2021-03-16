import React from 'react'
import { useMediaQueryContext } from '../../contexts'
import { DesktopSidebar, DesktopSidebarProps } from './DesktopSidebar'
import { MobileSidebar, MobileSidebarProps } from './MobileSideBar'

type SidebarProps = MobileSidebarProps & DesktopSidebarProps

export function Sidebar(props: SidebarProps) {
  const { onClose, isOpen, btnRef, logout } = props

  const { desktop } = useMediaQueryContext()

  return desktop ? (
    <DesktopSidebar logout={logout} />
  ) : (
    <MobileSidebar
      onClose={onClose}
      logout={logout}
      isOpen={isOpen}
      btnRef={btnRef}
    />
  )
}
