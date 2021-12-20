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

export default function Dashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
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
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        description: meta.data.description,
        name: meta.data.name
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }
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
      }}>Empty</h1>
    </div>
  )
  return (
    <div>
      <h1 style={{
        fontSize:'2rem',
        fontWeight:'300',
        marginLeft: '50px'
      }}>Creation</h1>
      <div style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        {
          nfts.map((nft, i) => (
            <Card key={i} image={nft.image} name={nft.name} description={nft.description} price={nft.price} />
          ))
        }
      </div>
      <h1 style={{
        fontSize:'2rem',
        fontWeight:'300',
        marginLeft: '50px'
      }}>Sell</h1>
      <div style={{
        width: '100%s',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        {
          sold.map((nft, i) => (
            <Card key={i} image={nft.image} name={nft.name} description={nft.description} price={nft.price} />
          ))
        }
      </div>
    </div>
  )
}