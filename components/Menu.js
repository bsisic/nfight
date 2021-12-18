import React from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from '../styles/components/Menu.module.css'

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
                router.pathname === "/mint" ? (
                    <Link href="/mint">
                        <a className={styles.menuitemactive}>Create</a>
                    </Link>
                ) : (
                    <Link href="/mint">
                        <a className={styles.menuitem}>Create</a>
                    </Link>
                )
            }
            {
                router.pathname === "/collection" ? (
                    <Link href="/collection">
                        <a className={styles.menuitemactive}>Collection</a>
                    </Link>
                ) : (
                    <Link href="/collection">
                        <a className={styles.menuitem}>Collection</a>
                    </Link>
                )
            }
            {
                router.pathname === "/dashboard" ? (
                    <Link href="/dashboard">
                        <a className={styles.menuitemactive}>Dashboard</a>
                    </Link>
                ) : (
                    <Link href="/dashboard">
                        <a className={styles.menuitem}>Dashboard</a>
                    </Link>
                )
            }
            {
                router.pathname === "/battle" ? (
                    <Link href="/battle">
                        <a className={styles.menuitemactive}>Battle</a>
                    </Link>
                ) : (
                    <Link href="/battle">
                        <a className={styles.menuitem}>Battle</a>
                    </Link>
                )
            }
        </div>
    )
}