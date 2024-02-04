import { renderHook, RenderResult } from '@testing-library/react-hooks'
import { ICardElement } from '../types/game'
import { UseDrawCards } from './useDrawCards'

let ctx: CanvasRenderingContext2D
let cardsElement: ICardElement[]
let result: RenderResult<{
  drawCards: () => void
  drawCard: (img: CanvasImageSource, dx: number, dy: number) => void
  animateCards: (x: number, y: number) => void
}>
const setCardsElement = jest.fn()
const setSelectedCard = jest.fn()

describe('UseDrawCards hook', () => {
  beforeEach(() => {
    ctx = {
      clearRect: jest.fn(),
      drawImage: jest.fn(),
    } as unknown as CanvasRenderingContext2D
    cardsElement = [
      { id: 1, img: new Image(), left: 0, top: 0, width: 100, height: 100 },
    ]

    result = renderHook(() =>
      UseDrawCards(ctx, cardsElement, setCardsElement, setSelectedCard)
    ).result
  })

  it('Карточки корректно инициализируются', () => {
    result.current.drawCards()
    expect(ctx.clearRect).toHaveBeenCalled()
    expect(ctx.drawImage).toHaveBeenCalled()
    expect(setCardsElement).toHaveBeenCalled()
  })

  it('Анимация карточек отрабатывает', () => {
    result.current.animateCards(50, 50)
  })

  it('После обновления данных в cardsElement происходит рендер', () => {
    const { rerender } = renderHook(
      ({ cards }) => UseDrawCards(ctx, cards, setCardsElement, setSelectedCard),
      { initialProps: { cards: cardsElement } }
    )

    const updatedCardsElement: ICardElement[] = [
      { id: 2, img: new Image(), left: 10, top: 10, width: 100, height: 100 },
    ]
    rerender({ cards: updatedCardsElement })

    expect(ctx.clearRect).toHaveBeenCalledTimes(1)
    expect(ctx.drawImage).toHaveBeenCalledTimes(1)
    expect(setCardsElement).toHaveBeenCalledTimes(1)
  })
})
