import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import {nftmarketaddress, nftaddress} from '../../config'
import axios from "axios"

import {ethers} from "ethers"

export async function getMyNfts(provider, signer) {
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)

    const nfts = await marketContract.fetchMyNFTs()

    return Promise.all(nfts.map(async i => {
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
}