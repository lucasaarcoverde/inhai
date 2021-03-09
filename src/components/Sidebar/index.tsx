import React from 'react'
import { DesktopSidebar } from './DesktopSidebar'
import { MobileSidebar, MobileSidebarProps } from './MobileSideBar'

type SidebarProps = MobileSidebarProps & { desktop: boolean }

export function Sidebar(props: SidebarProps) {
  const { onClose, isOpen, btnRef, desktop } = props

  return desktop ? (
    <DesktopSidebar />
  ) : (
    <MobileSidebar onClose={onClose} isOpen={isOpen} btnRef={btnRef} />
  )
}
