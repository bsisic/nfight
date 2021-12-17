import create from "zustand"

const useDeckStore = create(set => ({
    deck: [],
    setDeck: (deck) => set(_ => ({ deck })),
    addToDeck : (card) => set(state => ({ deck : [...state.deck, card ] })),
    removeFromDeck: (card) => set(state => ({ deck: state.deck.filter(item => item.image !== card.image) }))
}))

export default useDeckStore