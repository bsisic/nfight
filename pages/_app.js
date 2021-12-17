import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { AnimatePresence } from 'framer-motion';
import {ethers} from "ethers"
import Web3Modal from "web3modal"
import useDeckStore from '../store/deck'
import axios from 'axios'
import Deck from '../components/Deck'
import { getMyNfts } from '../api/services/NftService'

function NFighT({ Component, pageProps }) {
  const [signer, setSigner] = useState(null);
  const {deck, setDeck} = useDeckStore(({deck, setDeck}) => ({deck, setDeck}))

  useEffect(() => {
    loadSigner() 
  }, []);

  useEffect(() => {
    if(!signer) return 
    loadDeck()
  }, [signer])

  async function loadSigner() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    
    setSigner(connection.selectedAddress)
  }

  async function loadDeck() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const nfts = await getMyNfts(provider, signer)

    axios.get("/api/deck", {params: {key: connection.selectedAddress}})
    .then(res => {
      const deck = res.data.nfts.map(nft => nfts.find(item => item.image === nft))
      console.log({deck});
      setDeck(deck)
    })
  }
  
  console.log({deck});

  return (
    <AnimatePresence>
      <Head>
        <title>NFighT</title>
        <meta name="description" content="NFT playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header signer={signer}/>
        <Deck deck={deck} />
        <Menu/>

        <Component {...pageProps} />
      </main>
      
      <Footer/>
    </AnimatePresence>
  )
}

export default NFighT