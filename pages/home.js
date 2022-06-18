import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="KMCC Membership Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-center'>Home Page</h1>
    </div>
  )
}
