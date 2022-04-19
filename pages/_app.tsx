import English from '../content/compiled-locales/en.json'
import Portuguese from '../content/compiled-locales/pt.json'

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()
  const [shortLocale] = locale ? locale.split('-') : ['pt']

  const messages = useMemo(() => {
    switch (shortLocale) {
      case 'pt':
        return Portuguese
      case 'en':
        return English
      default:
        return Portuguese
    }
  }, [shortLocale])

  return (
    <IntlProvider locale={shortLocale} messages={messages} onError={() => null}>
      <Component {...pageProps} />
    </IntlProvider>
  )
}

export default MyApp
