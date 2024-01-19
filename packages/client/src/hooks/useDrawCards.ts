import { gameSettings } from '../constants/game'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ICardElement } from '../types/game'

type UseDrawCards = (
  ctx: CanvasRenderingContext2D | null,
  cardsElement: ICardElement[],
  setCardsElement: Dispatch<SetStateAction<ICardElement[]>>
) => {
  drawCards: () => void
  animateCards: (x: number, y: number) => void
}

export const UseDrawCards: UseDrawCards = (
  ctx,
  cardsElement,
  setCardsElement
) => {
  const drawCard = (img: CanvasImageSource, dx = 0, dy = 0) => {
    ctx &&
      ctx.drawImage(
        img,
        dx,
        dy,
        gameSettings.CARD_WIDTH_PX,
        gameSettings.CARD_HEIGHT_PX
      )
  }
  const drawCards = () => {
    let dx = gameSettings.CANVAS_WIDTH_PX / 2 - gameSettings.CARD_WIDTH_PX * 1.5
    let dy = gameSettings.CANVAS_HEIGHT_PX / 2 - gameSettings.CARD_HEIGHT_PX
    let counterCurrentLine = 0
    ctx &&
      ctx.clearRect(
        0,
        0,
        gameSettings.CANVAS_WIDTH_PX,
        gameSettings.CANVAS_HEIGHT_PX
      )

    const newCardsElement: ICardElement[] = []
    cardsElement.forEach(card => {
      newCardsElement.push({
        ...card,
        top: dy,
        left: dx,
      })

      dx += gameSettings.CARD_WIDTH_PX + 10
      counterCurrentLine += 1

      if (counterCurrentLine === 3) {
        dx = gameSettings.CANVAS_WIDTH_PX / 2 - gameSettings.CARD_WIDTH_PX * 1.5
        dy += gameSettings.CARD_HEIGHT_PX + 10
      }
    })
    setCardsElement(newCardsElement)
  }

  const animateCards = (x: number, y: number) => {
    cardsElement.forEach(function (element) {
      if (
        y > element.top &&
        y < element.top + element.height &&
        x > element.left &&
        x < element.left + element.width
      ) {
        let animationX = element.left
        let animationY = element.top
        const intervalX = setInterval(() => {
          const arr: ICardElement[] = cardsElement.map(card => {
            if (card.id === element.id) {
              card.top = element.top
              card.left = animationX
            }
            return card
          })

          setCardsElement(arr)
          animationX += 10
          if (
            animationX >
            gameSettings.CANVAS_WIDTH_PX - gameSettings.CARD_WIDTH_PX
          ) {
            clearInterval(intervalX)
          }
        }, 20)

        const intervalY = setInterval(() => {
          const arr = cardsElement.map(card => {
            if (card.id === element.id) {
              card.top = animationY
              card.left = element.left
            }
            return card
          })
          setCardsElement(arr)

          if (animationY === 0) {
            clearInterval(intervalY)
          } else {
            animationY -= 10
          }
        }, 20)
      }
    })
  }

  useEffect(() => {
    ctx &&
      ctx.clearRect(
        0,
        0,
        gameSettings.CANVAS_WIDTH_PX,
        gameSettings.CANVAS_HEIGHT_PX
      )
    cardsElement.forEach(card => {
      drawCard(card.img, card.left, card.top)
    })
  }, [cardsElement])

  return {
    drawCards,
    animateCards,
  }
}
