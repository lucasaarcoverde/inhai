import Head from 'next/head'
import { ReactNode } from 'react'

export default function Layout(props: LayoutProps) {
  const { children, title } = props

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  )
}

export interface LayoutProps {
  children?: ReactNode
  title: string
}
