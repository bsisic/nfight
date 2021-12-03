import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/image'
import {
  nftmarketaddress, nftaddress
} from '../config'
import Card from '../components/Card'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function Battle() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading && !nfts.length) return (
    <div style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
      <h1 style={{
        fontWeight: '300'
      }}>Loading ...</h1>
    </div>
  )
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexWrap:'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h1 style={{
        fontWeight: '300'
      }}>Find a battle : </h1>
      <button style={{
        marginLeft: '5px',
        width: '300px',
        height: '3rem',
        backgroundColor: 'white',
        border: 'none',
        fontFamily: 'Helvetica Neue, sans-serif',
        fontWeight: '700',
        fontSize:'30px',
        cursor: 'pointer'
      }}>
        PLAY! 🕵️‍♂️
      </button>
    </div>
  )
}