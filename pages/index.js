import React, {useEffect, useState} from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'

let Web3 = require('web3')

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        let w3 = new Web3(ethereum)
        setWeb3(w3)
      }).catch((err) => console.log(err))
    : console.log("Please install MetaMask")
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>nfight</title>
        <meta name="description" content="NFT cards battle game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">NFighT!</a>
        </h1>
        { address ? <p>Address : {address}</p> : null }
      </main>

      <Footer/>
    </div>
  )
}