import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import {
  nftmarketaddress, nftaddress
} from '../config'
import Card from '../components/Card'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function Collection() {
  const [nfts, setNfts] = useState([])
  const [deck, setDeck] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [nfts])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        description: meta.data.description,
        name: meta.data.name
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function addToDeck(nft) {
    if (deck.includes(nft.name)) {
      setDeck(deck.filter(item => item !== nft.name))
    } else {
      setDeck(deck => [...deck, nft.name])
    }
  }
  useEffect(() => {
    localStorage.setItem("deck", deck)
  }, [deck]);

  useEffect(() => {
    if (localStorage.getItem("deck") !== null){
      console.log(localStorage.getItem("deck"))
    }
  }, []);

  if (loadingState === 'loaded' && !nfts.length) return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
      <h1 style={{
        fontWeight: '300'
      }}>No NFT in your collection</h1>
    </div>
  )
  return (
    <div style={{
      width: '100vw',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
      { deck && (
        <div>{ deck.map((name, i) => {
          return (
            <p key={i}>{name}</p>
          )
        }) }</div>
      )}
      <div style={{
        width: '100vw',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        {
          nfts.map((nft, i) => (
            <Card key={i} image={nft.image} name={nft.name} description={nft.description} onClick={() => addToDeck(nft)} price={nft.price} nobuy={true} isDeck={deck.includes(nft.name)}/>
          ))
        }
      </div>
    </div>
  )
}

