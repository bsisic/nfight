import React from "react";
import styles from '../styles/components/Header.module.css'
import Animated from "./Animated";

export default function Header({ signer, balance }) {
    return (
        <header className={styles.head}>
            <Animated>
                <h1 className={styles.title}>NF<span style={{
                    fontWeight: '300'
                }}>igh</span>T</h1>
            </Animated>
            <Animated>
                <h1 className={styles.subtitle}>
                    <span style={{
                    fontWeight: '300'
                }}>Mint</span> NFT
                    <span style={{
                    fontWeight: '300'
                }}>, trade it and play!</span>
                </h1>
            </Animated>

            { signer && (
                <div style={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign:'center'
                }}>
                    <p>Status : {signer} </p>
                    {/* <p>Balance : {balance} </p> */}
                </div>
            )}
        </header>
    )
}