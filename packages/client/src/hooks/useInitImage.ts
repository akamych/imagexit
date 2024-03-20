import { useEffect, useState } from 'react'
import { ICardElement } from '../types/game'
import { toDataURL } from '../helpers/image'
import { gameSettings } from '../constants/game'

/*
 * Хук отвечает за подготовку изображений для последующей отрисовке в игре
 * */
export const UseInitImage = () => {
  const [cardsElement, setCardsElement] = useState<ICardElement[]>([])

  useEffect(() => {
    const cards: CanvasImageSource[] = []
    const promises: any[] = []
    Array.from({ length: 6 }).forEach((_, index) => {
      promises.push(
        toDataURL(`../../assets/images/cards/${index + 1}.jpeg`).then(dataUrl => {
          cards.push(dataUrl as CanvasImageSource)
        })
      )
    })

    const arr: ICardElement[] = []
    Promise.all(promises).then(() => {
      cards.forEach((card, index) => {
        arr.push({
          width: gameSettings.CARD_WIDTH_PX,
          height: gameSettings.CARD_HEIGHT_PX,
          top: 0,
          left: 0,
          img: card,
          id: index,
        })
      })
      setCardsElement(arr)
    })
  }, [])

  return {
    cardsElement,
    setCardsElement,
  }
}
