import { connectDb } from "../../api/database/connect"
import { getDeck, saveDeck } from "../../api/services/DeckService"

async function saveDeckHandler(req, res) {
    const body = req.body

    await connectDb()

    const result = await saveDeck(body.key, body.nfts)

    return res.status(201).json(result)
}

async function getDeckHandler(req, res) {
    await connectDb()
    const { key } = req.query

    if(!key) {
        return res.status(400).send()
    }

    const result = await getDeck(key)
    console.log({result})

    if(!result) {
        return res.status(404).send()
    }

    return res.status(200).json(result)
} 

export default function deckHandler(req, res) {

    switch(req.method) {
        case 'POST': 
            return saveDeckHandler(req, res)
        case 'GET' :
            return getDeckHandler(req, res)
    }

    if(req.method !== "POST") {
        return res.status(400).send()
    }
}