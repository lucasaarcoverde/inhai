import * as React from 'react'
import { Welcome } from '../components'

import { Layout } from '../components/Layout'

// markup
const IndexPage = () => {
  return (
    <Layout>
      <title>Inhai</title>
      <Welcome />
    </Layout>
  )
}

export default IndexPage
