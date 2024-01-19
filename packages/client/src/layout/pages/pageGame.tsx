import { Typography, Input, Space } from 'antd'
import { UseDrawField } from '../../hooks/useDrawField'
import { UseDrawPlayers } from '../../hooks/useDrawPlayers'
import { gameSettings } from '../../constants/game'
import { UseInitCanvas } from '../../hooks/useInitCanvas'
import { UseInitImage } from '../../hooks/useInitImage'
import { UseDrawCards } from '../../hooks/useDrawCards'
import { UseHandler } from '../../hooks/useHandler'
import { UseGameCore } from '../../hooks/useGameCore'
import { useEffect } from 'react'
import { inputContainer } from '../../assets/pageGameStyle'

export const PageGame = () => {
  const { Title } = Typography

  const {
    startGame,
    setStartGame,
    setSelectedCard,
    selectedCard,
    visibleField,
    setVisibleField,
  } = UseGameCore()
  const { ctx, canvas, clearCanvas } = UseInitCanvas()
  const { setPlace, fieldsElement } = UseDrawField(ctx)
  const { cardsElement, setCardsElement } = UseInitImage()
  const { setNext, generatePlayers } = UseDrawPlayers(
    ctx,
    fieldsElement,
    setPlace
  )
  const { drawCards, animateCards, drawCard } = UseDrawCards(
    ctx,
    cardsElement,
    setCardsElement,
    setSelectedCard
  )
  const { addClick, removeClick } = UseHandler(canvas)

  useEffect(() => {
    if (startGame) {
      addClick(animateCards)
    } else {
      removeClick(animateCards)
    }
  }, [startGame])

  const setImage = () => {
    setVisibleField(false)
    drawCards()
    setStartGame(true)
  }

  const nextStep = () => {
    clearCanvas()
    setNext((prev: number) => prev + 1)
    setPlace()
    generatePlayers()
    if (selectedCard) {
      drawCard(selectedCard.img, selectedCard.left, selectedCard.top)
    }
  }

  const initPlace = () => {
    clearCanvas()
    setVisibleField(true)
    setPlace()
    setStartGame(false)
    if (selectedCard) {
      drawCard(selectedCard.img, selectedCard.left, selectedCard.top)
    }
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
      <Space style={inputContainer}>
        <button onClick={setImage}>Начать игру</button>
        <button onClick={initPlace}>Посмотреть игровое поле</button>
        {visibleField && (
          <button onClick={nextStep}>Генерация положения на поле</button>
        )}
      </Space>
    </>
  )
}
