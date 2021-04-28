import React from 'react'

import { useMediaQuery } from '../../contexts'
import type { AppInfo } from '../../templates/HomePage'
import type { RatedPlace } from '../../templates/RatingsPage'
import { DesktopDashboard } from './DesktopDashboard'
import { MobileDashboard } from './MobileDashboard'

interface DashboardProps {
  places: RatedPlace[]
  appInfo: AppInfo
  badRatedPlaces: number
  goodRatedPlaces: number
}

export function Dashboard(props: DashboardProps) {
  const { desktop } = useMediaQuery()

  return desktop ? (
    <DesktopDashboard {...props} />
  ) : (
    <MobileDashboard {...props} />
  )
}
