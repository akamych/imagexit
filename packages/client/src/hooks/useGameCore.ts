import { useState } from 'react'
import { ICardElement } from '../types/game'

export const UseGameCore = () => {
  const [isStartGame, setIsStartGame] = useState(false)
  const [visibleField, setVisibleField] = useState(false)

  const [selectedCard, setSelectedCard] = useState<ICardElement | null>(null)

  return {
    isStartGame,
    setIsStartGame,
    selectedCard,
    setSelectedCard,
    visibleField,
    setVisibleField,
  }
}
