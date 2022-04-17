import { ReactNode } from 'react'
import { Stack } from './layout'

export function LandingCard(props: LandingCardProps) {
  const { icon, title, description } = props

  return (
    <Stack className="child:mr-4">
      <div className="p-6 bg-gray-100 rounded-full">{icon}</div>
      <Stack direction="column" className="max-w-xs child:mb-1">
        <p className="w-full text-xl font-bold text-lef">{title}</p>
        <p className="text-gray-400">{description}</p>
      </Stack>
    </Stack>
  )
}

interface LandingCardProps {
  icon: ReactNode
  title: ReactNode
  description: ReactNode
}
