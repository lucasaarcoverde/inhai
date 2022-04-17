import type { NextPage } from 'next'
import { Anchor, Layout, Map } from '../components'

const Home: NextPage = () => {
  return (
    <Layout title="Home | Inhaí">
      <Anchor href="/about">Go to about</Anchor>
      <Map />
    </Layout>
  )
}

export default Home
