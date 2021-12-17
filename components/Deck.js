import React, { useEffect, useState } from "react"
import * as styles from "../styles/components/Deck.module.css"
import { LittleCard } from "./LittleCard"
import classNames from "classnames"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"

export default function Deck({ deck }) {
    const [activeModal, setActiveModal] = useState(false)
    const { push } = useRouter()

    const onClickBtn = () => {
        setActiveModal(prev => !prev)
    }

    const onClickLink = () => {
        setActiveModal(false)
        push("/collection")
    }

    return (
        <>
            <button onClick={onClickBtn} className={classNames(styles.myDeckBtn, activeModal ? styles.activeDeckBtn : null)}>My Deck</button>
            <AnimatePresence>
                {
                    activeModal && (
                        <motion.div
                            initial={{ transform: 'scale(0)' }}
                            animate={{ transform: 'scale(1)' }}
                            exit={{ transform: 'scale(0)', opacity: 0 }}
                            className={styles.wrapper}>
                            <div className={styles.modalContainer}>
                                <h4 className={styles.modalTitle}>My Deck</h4>
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
                                                className={styles.card}
                                            />
                                        ))
                                    }
                                    {
                                        deck.length === 0 && (
                                            <p className={styles.noRecords}>
                                                Your deck is empty <br /> To add card, click <a onClick={onClickLink} className={styles.link}>here</a>
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </motion.div>

                    )
                }
            </AnimatePresence>
        </>
    )
}