import { Html, Head, Main, NextScript } from 'next/document'
import FooterComponent from '../components/common/footer.component'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="KMCC membership application"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
        <FooterComponent></FooterComponent>
      </body>
    </Html>
  )
}