import Head from 'next/head'
import Link from 'next/link'

export default function AdviserHome() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1 className="bg-blue">First Post</h1>
      <h2>
        <Link href="/">
          <a className="">Back to home</a>
        </Link>
      </h2>
    </>
  )
}
