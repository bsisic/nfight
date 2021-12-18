import React from "react";
import Image from 'next/image'
import styles from '../styles/components/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
            href="https://elliotcorp.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                textDecoration:'none',
                color: 'white',
                textTransform:'none'
            }}
            >
            Powered by
            <span className={styles.logo}>
                <Image src="/logo-elliotcorp.png" alt="Elliot Corp Logo" width={32} height={32} />
            </span>
            </a>
        </footer>
    )
}