import DeckModel from "../models/Deck";

export async function saveDeck(key, cards) 
{
    let deck = await DeckModel.findOne({key}).exec()

    if(!deck) {
        deck = new DeckModel()
        deck.key = key
    }

    deck.nfts = cards 

    return deck.save()
}

export function getDeck(key) {
    return DeckModel.findOne({key}).exec()
}