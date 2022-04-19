import cn from 'classnames'

export function Stack(props: StackProps) {
  const { children, direction = 'row', className } = props

  const styles = cn(
    'flex',
    {
      'flex-col last-child:mb-0': direction === 'column',
      'flex-row last-child:mr-0 justify-start items-center':
        direction === 'row',
    },
    className
  )

  return <div className={styles}>{children}</div>
}

export interface StackProps extends React.ComponentPropsWithRef<'div'> {
  direction?: 'row' | 'column'
}
