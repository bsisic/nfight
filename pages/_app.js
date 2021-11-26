import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFighT</title>
        <meta name="description" content="NFT cards battle game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to NFighT
        </h1>

        <h3 className={styles.subtitle}>
          Buy and sell NFT cards, build your deck with your card's collection then fight other users in the arena.
        </h3>

        <div className={styles.menu}>
          <Link href="/">
            <a className={styles.menuitem}>
              Market
            </a>
          </Link>
          <Link href="/create-item">
            <a className={styles.menuitem}>
              Sell Digital Asset
            </a>
          </Link>
          <Link href="/my-assets">
            <a className={styles.menuitem}>
              My Collection
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className={styles.menuitem}>
              Dashboard
            </a>
          </Link>
        </div>

        <Component {...pageProps} />
      </main>
      
      <Footer/>
    </div>
  )
}

export default MyApp