import type { NextPage } from 'next'
import Layout from 'components/layout/layout'
import { Anchor } from 'components/anchor'

const Home: NextPage = () => {
  return (
    <Layout title="Home | Inhaí">
      <Anchor href="/about">Go to about</Anchor>
    </Layout>
  )
}

export default Home
