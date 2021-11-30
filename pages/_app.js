import Head from 'next/head'
import '../styles/globals.css'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { AnimatePresence } from 'framer-motion';

function NFighT({ Component, pageProps }) {
  return (
    <AnimatePresence>
      <Head>
        <title>NFighT</title>
        <meta name="description" content="NFT playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>
        
        <Menu/>

        <Component {...pageProps} />
      </main>
      
      <Footer/>
    </AnimatePresence>
  )
}

export default NFighT