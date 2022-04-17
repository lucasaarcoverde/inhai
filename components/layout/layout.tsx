import Head from 'next/head'
import { ReactNode } from 'react'
import { Topbar } from './topbar'

export function Layout(props: LayoutProps) {
  const { children, title, className } = props

  return (
    <div className={`w-screen h-screen ${className}`}>
      <Head>
        <title>{title}</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Topbar />
      {children}
    </div>
  )
}

export interface LayoutProps {
  children?: ReactNode
  title: string
  className?: string
}
