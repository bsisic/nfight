import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Image from 'next/image'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function Mint() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
    }}>
      <h1 style={{
        fontWeight: '300'
      }}>Mint your NFT</h1>

      <div style={{
        marginTop: '5rem',
        display:'flex',
        flexDirection: 'column',
        height: '400px',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
          <input
          style={{
            backgroundColor:'transparent',
            color: 'white',
            border: 'none',
            borderBottom: '2px solid white',
            paddingBottom: '10px',
            fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '20px'
          }}
            maxLength="20"
            placeholder="Name"
            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <input
          style={{
            backgroundColor:'transparent',
            color: 'white',
            border: 'none',
            borderBottom: '2px solid white',
            paddingBottom: '10px',
            fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '20px'
          }}
            maxLength="20"
            placeholder="Owner Name"
            onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
          style={{
            backgroundColor:'transparent',
            color: 'white',
            border: 'none',
            borderBottom: '2px solid white',
            paddingBottom: '10px',
            fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '20px'
          }}
            type="number"
            placeholder="Price in Eth"
            onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <input
            type="file"
            name="file"
            id="file"
            onChange={onChange}
            style={{
              backgroundColor:'transparent',
              color: 'white',
              border: 'none',
              borderBottom: '2px solid white',
              paddingBottom: '10px',
              fontFamily: 'Helvetica Neue, sans-serif',
              fontSize: '20px'
            }}
          />

          {
            fileUrl && (
              <Image 
              width="100%" 
              height="100%" 
              src={fileUrl} 
              alt="fileUrl"/>
            )
          }
          <button style={{
            width: '300px',
            height: '3rem',
            backgroundColor: 'white',
            border: 'none',
            fontFamily: 'Helvetica Neue, sans-serif',
            fontWeight: '700',
            cursor: 'pointer'
          }} onClick={createMarket}>
            Create
          </button>
      </div>
    </div>
  )
}