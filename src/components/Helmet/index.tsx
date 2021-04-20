import React from 'react'
import { useLocation } from '@reach/router'
import Helmet from 'react-helmet'
import './seo.css'

export const Seo = (props: SeoProps) => {
  const { title = 'Inhaí' } = props

  const url = 'https://inhai.vercel.app'

  const description =
    'Veja os locais mais bem avaliados como LGBTI+ friendly e deixe sua avaliação!'

  const { pathname } = useLocation()

  return (
    <Helmet
      bodyAttributes={{
        class: pathname === 'loading' ? '' : 'body',
      }}
      htmlAttributes={{
        class: 'html',
        lang: 'pt-BR',
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          charSet: 'utf-8',
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:site_name`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image:alt`,
          content: title,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
    >
      <link rel="preconnect" href="https://js.api.here.com/" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Inhaí" />
    </Helmet>
  )
}

interface SeoProps {
  title?: string
}
