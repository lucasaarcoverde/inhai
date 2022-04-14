import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../../components/layout'

const Home: NextPage = () => {
  return (
    <Layout title="About | Inhaí">
      <Link href="/">
        <a>Go to home</a>
      </Link>
    </Layout>
  )
}

export default Home
