import { Typography, Input, Space, Button } from 'antd'
import { UseDrawField } from '../../hooks/useDrawField'
import { UseDrawPlayers } from '../../hooks/useDrawPlayers'
import { gameSettings } from '../../constants/game'
import { UseInitCanvas } from '../../hooks/useInitCanvas'
import { UseInitImage } from '../../hooks/useInitImage'
import { UseDrawCards } from '../../hooks/useDrawCards'
import { UseHandler } from '../../hooks/useHandler'
import { UseGameCore } from '../../hooks/useGameCore'
import { useEffect } from 'react'
import { inputContainer, actionContainer } from '../../assets/pageGameStyle'

export const PageGame = () => {
  const { Title } = Typography

  const {
    isStartGame,
    setIsStartGame,
    setSelectedCard,
    selectedCard,
    visibleField,
    setVisibleField,
    fullScreen,
    setFullScreen,
  } = UseGameCore()
  const { ctx, canvas, clearCanvas } = UseInitCanvas()
  const { setPlace, fieldsElement } = UseDrawField(ctx)
  const { cardsElement, setCardsElement } = UseInitImage()
  const { generatePlayers } = UseDrawPlayers(ctx, fieldsElement)
  const { drawCards, animateCards, drawCard } = UseDrawCards(
    ctx,
    cardsElement,
    setCardsElement,
    setSelectedCard
  )
  const { addClick, removeClick } = UseHandler(canvas)

  useEffect(() => {
    if (isStartGame) {
      addClick(animateCards)
    } else {
      removeClick(animateCards)
    }
  }, [isStartGame])

  const startGame = () => {
    setVisibleField(false)
    drawCards()
    setIsStartGame(true)
  }

  const nextStep = () => {
    clearCanvas()
    setPlace()
    generatePlayers()
    selectedCard &&
      drawCard(selectedCard.img, selectedCard.left, selectedCard.top)
  }

  const initPlace = () => {
    clearCanvas()
    setVisibleField(true)
    setPlace()
    selectedCard &&
      drawCard(selectedCard.img, selectedCard.left, selectedCard.top)
  }

  const reloadGame = () => {
    clearCanvas()
    setIsStartGame(false)
    setSelectedCard(null)
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    setFullScreen(prev => !prev)
  }

  return (
    <>
      <Title>Cтраница игры</Title>

      <Space style={inputContainer}>
        {selectedCard && <Input placeholder="Напишите ассоциацию" />}
      </Space>

      <canvas
        id="canvas"
        width={gameSettings.CANVAS_WIDTH_PX}
        height={gameSettings.CANVAS_HEIGHT_PX}
        style={{ border: '1px solid black' }}></canvas>
      <Space style={actionContainer}>
        {isStartGame ? (
          <Button onClick={reloadGame}>Перезапустить игру</Button>
        ) : (
          <Button onClick={startGame}>Начать игру</Button>
        )}

        {visibleField ? (
          <Button onClick={nextStep}>
            Генерация положения игроков на поле
          </Button>
        ) : (
          <Button onClick={initPlace}>Посмотреть игровое поле</Button>
        )}
        <Button onClick={toggleFullScreen}>
          {fullScreen ? <>Закрыть</> : <>Открыть</>} &nbsp;полноэкранный режим
        </Button>
      </Space>
    </>
  )
}
