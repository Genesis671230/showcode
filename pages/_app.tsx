import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import AuthContentProvider from "../context/AuthContent"

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div>
    <AuthContentProvider>
    <Navbar/>
    <Component {...pageProps} />
    </AuthContentProvider>
  </div>
    )
}

export default MyApp
