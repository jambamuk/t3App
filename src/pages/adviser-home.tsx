import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function AdviserHome() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1 className="bg-blue">First Post</h1>
      <h2>
        <Link href="/">
          <a className="">Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}
