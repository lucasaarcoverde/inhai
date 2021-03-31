import * as React from 'react'
import { Fragment } from 'react'
import NotFound from '../templates/NotFound'
import { Seo } from '../components'

// markup
const NotFoundPage = () => {
  return (
    <Fragment>
      <Seo />
      <NotFound />
    </Fragment>
  )
}

export default NotFoundPage
