import Head from 'next/head'
import { ReactNode } from 'react'

export function Layout(props: LayoutProps) {
  const { children, title } = props

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>{title}</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <a
        target="_blank"
        href="https://www.mapbox.com/contribute/#/?owner=lucasan&id=cl1yaic41004715oa5elttel3&access_token=pk.eyJ1IjoibHVjYXNhbiIsImEiOiJjbDF5YTExZjYwYXl1M2NuM2V4M3kxa25oIn0.zu_NQpO3KzpynI-9GdXFeg&utm_source=http%3A%2F%2Flocalhost%3A3000%2F&utm_medium=attribution_link&utm_campaign=referrer"
        rel="noreferrer"
      >
        Map Feedback
      </a>
      {children}
    </div>
  )
}

export interface LayoutProps {
  children?: ReactNode
  title: string
}
