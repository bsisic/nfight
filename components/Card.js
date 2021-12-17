import React from "react";
import Image from "next/image";
import styles from "../styles/components/Card.module.css"

export default function Card(props) {
    return (
        <div className={styles.card}>
            <Image src={props.image} className={styles.cardimage} alt="props.image" layout="responsive" width="100%" height="100%" />
            <div className={styles.cardsec}>
                <p className={styles.cardname}>{props.name}</p>
                <p className={styles.carddesc}>{props.description}</p>
                <div className={styles.price}>
                    <p className={styles.pricetxt}>{props.price}</p>
                    <Image 
                    src="https://tuomodesign.store/wp-content/uploads/2020/12/tuomodesign_ethereum_3d_model_animated.gif" 
                    width="80%" 
                    height="80%"
                    alt="ethereum"/>
                </div>
                { !props.nobuy ? (
                <button className={styles.cardcta} onClick={props.onClick}>Buy</button>)
                : (
                <button className={styles.cardcta} onClick={props.onClick}>{ props.isDeck ? "✅" : "Select"}</button>
                )}
            </div>
        </div>
    )
}