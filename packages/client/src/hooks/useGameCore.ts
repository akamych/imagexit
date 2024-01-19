import { useState } from 'react'

export const UseGameCore = () => {
  const [startGame, setStartGame] = useState(false)
  return {
    startGame,
    setStartGame,
  }
}
