import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function CreatorDashboard() {
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
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    <div>
      <h2>Items Created</h2>
      <div className={styles.homesection}>
      {
        nfts.map((nft, i) => (
          <div key={i} className={styles.cardasset}>
            <Image src={nft.image} alt="" width="100%" height="100%" className={styles.cardassetimg} />
            <div>
              <p>Name : {nft.name}</p>
              <div>
                <p>Description : {nft.description}</p>
              </div>
            </div>
            <div>
              <p>Price : {nft.price} ETH</p>
            </div>
          </div>
        ))
      }
      </div>
      <h2>Items sold</h2>
      <div className={styles.homesection}>
      {
        Boolean(sold.length) && (
          sold.map((nft, i) => (
            <div key={i} className={styles.cardasset}>
              <Image src={nft.image} alt="" width="100%" height="100%" className={styles.cardassetimg} />
              <div>
                <p>Name : {nft.name}</p>
                <div>
                  <p>Description : {nft.description}</p>
                </div>
              </div>
              <div>
                <p>Price : {nft.price} ETH</p>
              </div>
            </div>
          ))
        )
      }
      </div>
    </div>
  )
}