import { model, models, Schema } from "mongoose";

const DeckSchema = new Schema({
    key: { type: String },
    nfts: { type: [String], default: [] }
})

const DeckModel = models.Decks ||  model("Decks", DeckSchema)

export default DeckModel