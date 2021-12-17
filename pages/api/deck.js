import { connectDb } from "../../api/database/connect"
import { getDeck, saveDeck } from "../../api/services/DeckService"
import {ethers} from "ethers"
import { getMyNfts } from "../../api/services/NftService"
import { MAX_CARDS_BY_DECK } from "../../constants/deck"

async function saveDeckHandler(req, res) {
    const body = req.body

    if(!body.key || !body.nfts) {
        return res.status(422).send("Missing data")
    }

    if(body.nfts > MAX_CARDS_BY_DECK) {
        return res.status(400).json("The deck has too many cards")
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.ETHER_CONNECTION_URL)
    const signer = provider.getSigner(body.key)
    const userNfts = await getMyNfts(provider, signer)

    const allowedNfts = body.nfts.filter(nft => userNfts.find(userNft => userNft.image === nft))

    await connectDb()

    const result = await saveDeck(body.key, allowedNfts)

    return res.status(201).json(result)
}

async function getDeckHandler(req, res) {
    await connectDb()
    const { key } = req.query

    if(!key) {
        return res.status(400).send()
    }

    const result = await getDeck(key)

    if(!result) {
        return res.status(404).send()
    }

    return res.status(200).json(result)
} 

export default function deckHandler(req, res) {
    try {
        switch(req.method) {
            case 'POST': 
                return saveDeckHandler(req, res)
            case 'GET' :
                return getDeckHandler(req, res)
            
            default: 
                return res.status(404).send()
        }
    }
    catch(e) {
        return res.status(500).send()
    }
}