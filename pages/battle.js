import { useEffect, useState } from 'react'
import * as styles from "../styles/pages/Battle.module.css"
import useDeckStore from '../store/deck'
import io from 'socket.io-client'

export default function Battle() {
  const [loading, setLoading] = useState(true)
  const { deck, setDeck } = useDeckStore(({ deck, setDeck }) => ({ deck, setDeck }))

  useEffect(() => {
    setLoading(false)
    console.log(deck)
  }, [deck])

  useEffect(() => {
    fetch('/api/').finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })
  }, [])

  if (loading && deck.length !== 5) return (
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
      <h1 className={styles.title}>Players connected : </h1>
    </div>
  )
}