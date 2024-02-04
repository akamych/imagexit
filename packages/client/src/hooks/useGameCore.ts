import { useEffect, useState } from 'react'
import { ICardElement, IPlayerInfo, IRaundInfo } from '../types/game'
import { stepsInTheGame } from '../constants/game'
import { getApiRaundInfo } from '../components/game/testData'

/*
 * Хук отвечающий за ядро игры
 * Здесь должны находиться данные о самой игре и сопутствующей информации
 * */
export const UseGameCore = () => {
  const [isStartGame, setIsStartGame] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [visibleField, setVisibleField] = useState(false)
  const [animationField, setAnimationField] = useState(false)

  const [playersInfo, setPlayersInfo] = useState<IPlayerInfo[]>([]) // информация о игроках
  const [gameStep, setGameStep] = useState('start') // шаг в игре, статус
  const [raundInfo, setRaundInfo] = useState<IRaundInfo>(getApiRaundInfo()) // информация о раунде в игре

  const [selectedCard, setSelectedCard] = useState<ICardElement | null>(null)

  return {
    isStartGame,
    setIsStartGame,
    selectedCard,
    setSelectedCard,
    visibleField,
    animationField,
    setAnimationField,
    setVisibleField,
  }
}
