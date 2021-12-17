import React from "react"
import * as styles from "../styles/Deck.module.css"
import { LittleCard } from "./LittleCard"

export default function Deck({deck}) {
    return (
        <div className={styles.container}>
            {
                deck.map(nft => (
                    <LittleCard 
                    key={nft.image} 
                    image={nft.image} 
                    name={nft.name} 
                    description={nft.description} 
                    onClick={() => manageDeck(nft)} 
                    price={nft.price} 
                    nobuy={true} 
                    isDeck={false}
                    />
                ))
            }
        </div>
    )
}