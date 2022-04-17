import { ReactNode } from 'react'
import cn from 'classnames'

export function Stack(props: StackProps) {
  const { children, direction = 'row', className } = props

  const styles = cn(`flex ${className}`, {
    'flex-col last-child:mb-0': direction === 'column',
    'flex-row last-child:mr-0 justify-start items-center': direction === 'row',
  })

  return <div className={styles}>{children}</div>
}

interface StackProps {
  children?: ReactNode
  direction?: 'row' | 'column'
  className?: string
}
