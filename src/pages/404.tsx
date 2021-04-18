import * as React from 'react'
import { Fragment } from 'react'

import NotFound from '../templates/NotFound'
import { Seo } from '../components'

// markup
const NotFoundPage = () => {
  const browser = typeof window !== 'undefined' && window

  return (
    <Fragment>
      {browser && (
        <Fragment>
          <Seo />
          <NotFound />
        </Fragment>
      )}
    </Fragment>
  )
}

export default NotFoundPage
