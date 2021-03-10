import React from 'react'
import { useMediaQueryContext } from '../MediaQuery/context'
import { DesktopSidebar } from './DesktopSidebar'
import { MobileSidebar, MobileSidebarProps } from './MobileSideBar'

type SidebarProps = MobileSidebarProps

export function Sidebar(props: SidebarProps) {
  const { onClose, isOpen, btnRef } = props

  const { desktop } = useMediaQueryContext()

  return desktop ? (
    <DesktopSidebar />
  ) : (
    <MobileSidebar onClose={onClose} isOpen={isOpen} btnRef={btnRef} />
  )
}
