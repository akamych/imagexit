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
  const [raundInfo, setRaundInfo] = useState<IRaundInfo>(getApiRaundInfo(7)) // информация о раунде в игре
  const [selectedCard, setSelectedCard] = useState<ICardElement | null>(null)

  // ----------
  const setNextGameStep = () => {
    if (gameStep == 'results') {
      setGameStep(stepsInTheGame[1])
    } else {
      const stepNow = stepsInTheGame.indexOf(gameStep)
      setGameStep(stepsInTheGame[stepNow + 1])
    }
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setFullScreen(false)
      } else {
        setFullScreen(true)
      }
    })
  }, [])

  return {
    isStartGame,
    setIsStartGame,
    selectedCard,
    setSelectedCard,
    visibleField,
    animationField,
    setAnimationField,
    setVisibleField,
    fullScreen,
    setFullScreen,
    gameStep,
    setGameStep,
    setNextGameStep,
    setPlayersInfo,
    playersInfo,
    raundInfo,
    setRaundInfo,
  }
}
