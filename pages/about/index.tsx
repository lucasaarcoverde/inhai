import type { NextPage } from 'next'

import { Layout, Anchor } from '../../components'

const Home: NextPage = () => {
  return (
    <Layout title="About | Inhaí">
      <Anchor href="/">Go to home</Anchor>
    </Layout>
  )
}

export default Home
