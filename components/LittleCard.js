import React from "react"
import Image from "next/image"
import * as styles from "../styles/components/LittleCard.module.css"
import classNames from "classnames"

export function LittleCard({ image, name, className }) {
    return (
        <div className={ classNames(styles.card, className) }>
            <Image src={image} className={styles.cardimage} alt="image" layout="responsive" width="100%" height="100%" />
            <div className={styles.cardBody}>
                <p className={styles.cardName}>{name}</p>
            </div>
        </div>
    )
}