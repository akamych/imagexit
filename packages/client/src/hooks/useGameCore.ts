import { useState } from 'react'
import { ICardElement } from '../types/game'

export const UseGameCore = () => {
  const [startGame, setStartGame] = useState(false)
  const [visibleField, setVisibleField] = useState(false)

  const [selectedCard, setSelectedCard] = useState<ICardElement | null>(null)

  return {
    startGame,
    setStartGame,
    selectedCard,
    setSelectedCard,
    visibleField,
    setVisibleField,
  }
}
