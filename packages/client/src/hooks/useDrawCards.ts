import { gameSettings } from '../constants/game'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICardElement } from '../types/game'

type UseDrawCards = (
  ctx: CanvasRenderingContext2D | null,
  cardsElement: ICardElement[],
  setCardsElement: Dispatch<SetStateAction<ICardElement[]>>,
  setSelectedCard: Dispatch<SetStateAction<ICardElement | null>>,
  gameStep: string
) => {
  drawCards: () => void
  drawCard: (img: CanvasImageSource, dx: number, dy: number) => void
  animateCards: (x: number, y: number) => void
}

const CARD_COLUMNS = 3
const CARD_MARGIN_PX = 10
const ANIMATION_DURATION_MS = 20

/*
 * хук нужен для отрисовки карточек и их анимации
 *
 *
 * */

export const UseDrawCards: UseDrawCards = (ctx, cardsElement, setCardsElement, setSelectedCard, gameStep) => {
  const [cards, setCards] = useState<ICardElement[]>(cardsElement)
  const clearCanvas = () => {
    if (!ctx) {
      return
    }
    ctx.clearRect(0, 0, gameSettings.CANVAS_WIDTH_PX, gameSettings.CANVAS_HEIGHT_PX)
  }

  /*
   * Отрисовка одной карточки с заданым положением
   */
  const drawCard = (img: CanvasImageSource, dx = 0, dy = 0) => {
    if (!ctx) {
      return
    }
    ctx.drawImage(img, dx, dy, gameSettings.CARD_WIDTH_PX, gameSettings.CARD_HEIGHT_PX)
  }

  const drawCards = () => {
    let dx = gameSettings.CONTENT_LEFT_PX - gameSettings.CARD_WIDTH_PX / 2

    let dy = gameSettings.CANVAS_HEIGHT_PX / 2 - gameSettings.CARD_HEIGHT_PX
    let counterCurrentLine = 0
    // clearCanvas()
    const newCardsElement = cardsElement.map(card => {
      if (counterCurrentLine === CARD_COLUMNS) {
        dx = gameSettings.CONTENT_LEFT_PX - gameSettings.CARD_WIDTH_PX / 2
        dy += gameSettings.CARD_HEIGHT_PX + CARD_MARGIN_PX
      }

      dx += gameSettings.CARD_WIDTH_PX + CARD_MARGIN_PX
      counterCurrentLine += 1

      return {
        ...card,
        top: dy,
        left: dx,
      }
    })
    setCardsElement(newCardsElement)
    setCards(newCardsElement)
  }

  /*
   * Анимация карточки после клика на нее
   * Перемещает карточку в нижний правый угол
   * */
  const animateCards = (x: number, y: number) => {
    cards.forEach(function (element) {
      if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
        setSelectedCard(element)

        let animationX = element.left
        let animationY = element.top
        const intervalX = setInterval(() => {
          const arr: ICardElement[] = cards.map(card => {
            if (card.id === element.id) {
              card.top = element.top
              card.left = animationX
            }
            return card
          })

          setCards(arr)

          if (animationX > gameSettings.CANVAS_WIDTH_PX - gameSettings.CARD_WIDTH_PX) {
            clearInterval(intervalX)
          } else {
            animationX += CARD_MARGIN_PX
          }
        }, ANIMATION_DURATION_MS)

        const intervalY = setInterval(() => {
          const arr = cards.map(card => {
            if (card.id === element.id) {
              card.top = animationY
              card.left = element.left
            }
            return card
          })
          setCards(arr)

          if (animationY > gameSettings.CANVAS_HEIGHT_PX - gameSettings.CARD_HEIGHT_PX) {
            clearInterval(intervalY)
          } else {
            animationY += CARD_MARGIN_PX
          }
        }, ANIMATION_DURATION_MS)
      }
    })
  }

  useEffect(() => {
    if (gameStep == 'voting' || gameStep == 'association') {
      clearCanvas()
      cardsElement.forEach(card => {
        drawCard(card.img, card.left, card.top)
      })
    }
  }, [cards, gameStep])

  return {
    drawCards,
    animateCards,
    drawCard,
  }
}
