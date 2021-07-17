import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import TopNav from '../components/TopNav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from '../context'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Head>
        <title>edemy（準備中）</title>
        <meta
          name="description"
          content="学ぶ人たちがつながるためのプラットフォーム。絶賛準備中です。"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
