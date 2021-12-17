import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Card from '../components/Card'
import { getMyNfts } from '../api/services/NftService'
import useDeckStore from '../store/deck'

export default function Collection() {
  const [nfts, setNfts] = useState([])
  const {deck, addToDeck, removeFromDeck} = useDeckStore(({deck, addToDeck, removeFromDeck}) => ({ deck, addToDeck, removeFromDeck }))
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [userAddress, setUserAddress] = useState("")

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

    setUserAddress(connection.selectedAddress)

    const items = await getMyNfts(provider, signer)

    setNfts(items)
    setLoadingState('loaded') 
  }
  async function manageDeck(nft) {
    console.log(deck.find(item => item.image === nft.image))
    if (deck.find(item => item.image === nft.image)) {
      removeFromDeck(nft)
    } else {
      addToDeck(nft)
    }
  }
  useEffect(() => {
    localStorage.setItem("deck", deck)
    if(nfts.length > 0) {
      axios.post("/api/deck", { key: userAddress, nfts: deck.map(item => item.image) } )
      .catch(e => console.error(e))
    }
  }, [deck]);

  useEffect(() => {
    if(!userAddress) return 

    axios.get("/api/deck", {params: { key: userAddress }})
    .then(result => {
      setDeck(result.data.nfts)
    })
    .catch(e => console.error(e))

    if (localStorage.getItem("deck") !== null){
      console.log(localStorage.getItem("deck"))
    }

  }, [userAddress]);

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
      <div style={{
        width: '100vw',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        {
          nfts.map((nft, i) => (
            <Card key={nft.image} image={nft.image} name={nft.name} description={nft.description} onClick={() => manageDeck(nft)} price={nft.price} nobuy={true} isDeck={deck.find(item => item.image === nft.image)}/>
          ))
        }
      </div>
    </div>
  )
}

