import Image from 'next/image'
import { Star } from 'react-feather'
import cn from 'classnames'

import { Stack } from '../layout'

export function LandingPlaceCard(props: LandingPlaceProps) {
  const { position = 'start', className, place, rate } = props

  const classNames = cn(
    'p-4 w-52 h-64 bg-white rounded-lg child:mb-2 shadow-medium',
    { 'self-end': position === 'end' },
    className
  )

  return (
    <Stack direction="column" className={classNames}>
      <span className="relative w-full h-20">
        <Image
          className="rounded-xl"
          src="/images/test.jpeg"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </span>

      <Stack className="justify-center child:mr-1">
        <Stack>
          <Star className="w-3 h-3" />
          <p className="text-sm text-bold">{rate}</p>
        </Stack>
        <span className="text-sm text-bold">- {place}</span>
      </Stack>
    </Stack>
  )
}

interface LandingPlaceProps {
  position?: 'end' | 'start'
  className?: string
  rate: number
  place: string
}
