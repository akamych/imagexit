import { useEffect, useState } from 'react'
import { ICardElement, IPlayerInfo, IRaundInfo, defaultRaundInfo } from '../types/game'
import { playerColors, stepsInTheGame } from '../constants/game'
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
  const [playersInfo, setPlayersInfo] = useState<IPlayerInfo[]>([{ userId: 'self', login: 'self', color: playerColors[6] }]) // информация о игроках
  const [gameStep, setGameStep] = useState<string>('') // шаг в игре, статус
  const [difficulty, setDifficulty] = useState('normal') // уровень сложности в игре  light,normal/hard
  const [raundInfo, setRaundInfo] = useState<IRaundInfo>(getApiRaundInfo(7)) // информация о раунде в игре getApiRaundInfo()

  const [selectedCard, setSelectedCard] = useState<ICardElement | null>(null)

  // ----------
  const setNextGameStep = () => {
    console.log('gameStep', gameStep)
    if (gameStep == 'results') {
      setGameStep(stepsInTheGame[1])
    } else {
      if (gameStep != '') {
        const stepNow = stepsInTheGame.indexOf(gameStep)
        console.log('gameStep stepNow', stepNow)
        setGameStep(stepsInTheGame[stepNow + 1])
      } else {
        setGameStep(stepsInTheGame[0])
      }
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
    difficulty,
    setDifficulty,
  }
}
