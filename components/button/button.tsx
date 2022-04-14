import styles from './button.module.css'
import cn from 'classnames'

export function Button(props: ButtonProps) {
  const buttonProps = useButton(props)

  return <button {...buttonProps} />
}

export function useButton(props: ButtonProps) {
  const {
    variant = 'filled',
    shape = 'rounded',
    className,
    ...restProps
  } = props

  const variants = cn({
    [styles.filled]: variant === 'filled',
    [styles.ghost]: variant === 'ghost',
    [styles.outline]: variant === 'outline',
  })

  const shapes = cn({
    rounded: shape === 'rounded',
    circle: shape === 'circle',
  })

  return {
    className: `${styles.btn} ${variants} ${shapes} ${className}`,
    ...restProps,
  }
}

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'filled' | 'ghost' | 'outline'
  shape?: 'rounded' | 'circle'
}
