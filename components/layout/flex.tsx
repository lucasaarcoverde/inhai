export function Flex(props: FlexProps) {
  const { className, children, ...restProps } = props

  return (
    <div className={`flex ${className}`} {...restProps}>
      {children}
    </div>
  )
}

export type FlexProps = React.ComponentPropsWithRef<'div'>
