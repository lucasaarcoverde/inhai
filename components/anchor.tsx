import Link from 'next/link'

export function Anchor(props: AnchorProps) {
  const { children, href = '/', ...restProps } = props

  return (
    <Link href={href}>
      <a
        className="font-semibold text-teal-600 hover:text-teal-700 active:text-teal-800"
        {...restProps}
      >
        {children}
      </a>
    </Link>
  )
}

type AnchorProps = React.ComponentPropsWithRef<'a'>
