import React from 'react'
import Helmet from 'react-helmet'
import './seo.css'

export const Seo = (props: SeoProps) => {
  const { title = 'Inhaí' } = props

  const url = 'https://inhai.vercel.app'

  const description =
    'Veja os locais mais bem avaliados como LGBTQI+ friendly e deixe sua avaliação!'

  return (
    <Helmet
      bodyAttributes={{
        class: 'body',
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
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Inhaí" />
      <script
        type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
      ></script>
    </Helmet>
  )
}

interface SeoProps {
  title?: string
}
