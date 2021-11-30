import React from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from '../styles/Menu.module.css'

export default function Menu() {
    const router = useRouter();
    return (
        <div className={styles.menu}>
            {
                router.pathname === "/" ? (
                    <Link href="/">
                        <a className={styles.menuitemactive}>Market</a>
                    </Link>
                ) : (
                    <Link href="/">
                        <a className={styles.menuitem}>Market</a>
                    </Link>
                )
            }
            {
                router.pathname === "/create-item" ? (
                    <Link href="/create-item">
                        <a className={styles.menuitemactive}>Create</a>
                    </Link>
                ) : (
                    <Link href="/create-item">
                        <a className={styles.menuitem}>Create</a>
                    </Link>
                )
            }
            {
                router.pathname === "/my-assets" ? (
                    <Link href="/my-assets">
                        <a className={styles.menuitemactive}>Collection</a>
                    </Link>
                ) : (
                    <Link href="/my-assets">
                        <a className={styles.menuitem}>Collection</a>
                    </Link>
                )
            }
            {
                router.pathname === "/creator-dashboard" ? (
                    <Link href="/creator-dashboard">
                        <a className={styles.menuitemactive}>Dashboard</a>
                    </Link>
                ) : (
                    <Link href="/creator-dashboard">
                        <a className={styles.menuitem}>Dashboard</a>
                    </Link>
                )
            }
        </div>
    )
}