import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { AnimatePresence } from 'framer-motion';

import Web3Modal from "web3modal"

function NFighT({ Component, pageProps }) {
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    loadSigner() 
  }, [signer]);
  async function loadSigner() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()

    setSigner(connection.selectedAddress)
  }
  return (
    <AnimatePresence>
      <Head>
        <title>NFighT</title>
        <meta name="description" content="NFT playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header signer={signer}/>
        
        <Menu/>

        <Component {...pageProps} />
      </main>
      
      <Footer/>
    </AnimatePresence>
  )
}

export default NFighT