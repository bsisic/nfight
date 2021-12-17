import { useEffect, useState } from 'react'
import * as styles from "../styles/pages/Battle.module.css"

export default function Battle() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading && !nfts.length) return (
    <div style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
      <h1 style={{
        fontWeight: '300'
      }}>Loading ...</h1>
    </div>
  )
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find a battle : </h1>
      <button className={styles.btn}>
        PLAY! 🕵️‍♂️
      </button>
    </div>
  )
}