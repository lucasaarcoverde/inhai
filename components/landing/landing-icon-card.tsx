import { Stack, StackProps } from 'components/layout'
import { ReactNode } from 'react'

export function IconCard(props: IconCardProps) {
  const { icon, children, className, ...restProps } = props

  return (
    <Stack
      direction="column"
      className={`prose items-center p-2 w-52 rounded-2xl child:mb-6 ${className}`}
      {...restProps}
    >
      {icon}
      <span className="text-center">{children}</span>
    </Stack>
  )
}

export interface IconCardProps extends StackProps {
  icon: ReactNode
}
