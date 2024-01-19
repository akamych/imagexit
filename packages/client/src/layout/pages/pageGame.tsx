import { Typography } from 'antd'
import { UseDrawField } from '../../hooks/useDrawField'
import { UseDrawPlayer } from '../../hooks/useDrawPlayer'
import { gameSettings } from '../../constants/game'
import { UseInitCanvas } from '../../hooks/useInitCanvas'
import { UseInitImage } from '../../hooks/useInitImage'
import { UseDrawCards } from '../../hooks/useDrawCards'
import { UseHandler } from '../../hooks/useHandler'
import { UseGameCore } from '../../hooks/useGameCore'
import { useEffect } from 'react'

export const PageGame = () => {
  const { Title } = Typography

  const { startGame, setStartGame } = UseGameCore()
  const { ctx, canvas } = UseInitCanvas()
  const { setPlace, fieldsElement } = UseDrawField(ctx)
  const { cardsElement, setCardsElement } = UseInitImage()
  const { setNext } = UseDrawPlayer(ctx, fieldsElement, setPlace)
  const { drawCards, animateCards } = UseDrawCards(
    ctx,
    cardsElement,
    setCardsElement
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
    drawCards()
    setStartGame(true)
  }

  const nextStep = () => {
    setNext((prev: number) => prev + 1)
  }

  const initPlace = () => {
    setPlace()
    setStartGame(false)
  }

  return (
    <>
      <Title>Cтраница игры</Title>

      <canvas
        id="canvas"
        width={gameSettings.CANVAS_WIDTH_PX}
        height={gameSettings.CANVAS_HEIGHT_PX}
        style={{ border: '1px solid black' }}></canvas>
      <button onClick={setImage}>Start</button>
      <button onClick={initPlace}>Set Place</button>
      <button onClick={nextStep}>Next</button>
    </>
  )
}
