import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>nfight</title>
        <meta name="description" content="NFT cards battle game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">Nfight!</a>
        </h1>
      </main>

      <Footer/>
    </div>
  )
}
