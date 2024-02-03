import { useState } from 'react'
import { ICardElement, IPlayerInfo, IRaundInfo } from '../types/game'
import { stepsInTheGame } from '../constants/game'
import { getApiRaundInfo } from '../components/game/testData'

/*
 * Хук отвечающий за ядро игры
 * Здесь должны находиться данные о самой игре и сопутствующей информации
 * */
export const UseGameCore = () => {
  const [isStartGame, setIsStartGame] = useState(false)
  const [visibleField, setVisibleField] = useState(false)
  const [animationField, setAnimationField] = useState(false)

  const [playersInfo, setPlayersInfo] = useState<IPlayerInfo[]>([]) // информация о игроках
  const [gameStep, setGameStep] = useState('start') // шаг в игре, статус
  const [raundInfo, setRaundInfo] = useState<IRaundInfo>(getApiRaundInfo()) // информация о раунде в игре

  const [selectedCard, setSelectedCard] = useState<ICardElement | null>(null)

  // ----------
  const setNextGameStep = () => {
    console.log('gameStep', gameStep)
    if (gameStep == 'results') {
      setGameStep(stepsInTheGame[1])
    } else {
      const stepNow = stepsInTheGame.indexOf(gameStep)
      console.log('gameStep stepNow', stepNow)
      setGameStep(stepsInTheGame[stepNow + 1])
    }
  }

  return {
    isStartGame,
    setIsStartGame,
    selectedCard,
    setSelectedCard,
    visibleField,
    animationField,
    setAnimationField,
    setVisibleField,
    gameStep,
    setGameStep,
    setNextGameStep,
    raundInfo,
    setRaundInfo,
    playersInfo,
    setPlayersInfo,
  }
}
