import Head from 'next/head'
import Link from 'next/link'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Index Page</title>
        <meta name="description" content="KMCC Membership Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-center'>Index Page</h1>

      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/home">Home</Link>
        </li>
      </ul>
    </div>
  )
}
