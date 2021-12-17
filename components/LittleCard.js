import React from "react"
import Image from "next/image"
import * as styles from "../styles/LittleCard.module.css"

export function LittleCard({ image, name, description, price }) {
    return (
        <div className={styles.card}>
            <Image src={image} className={styles.cardimage} alt="image" layout="responsive" width="100%" height="100%" />
            <div className={styles.cardBody}>
                <p className={styles.cardName}>{name}</p>
                {/* <p className={styles.carddesc}>{description}</p> */}
                {/* <div className={styles.price}>
                    <p className={styles.pricetxt}>{price}</p>
                    <div className={styles.priceImg}>
                        <Image
                            src="https://tuomodesign.store/wp-content/uploads/2020/12/tuomodesign_ethereum_3d_model_animated.gif"
                            width="80%"
                            height="80%"
                            alt="ethereum" />
                    </div>

                </div> */}
            </div>
        </div>
    )
}