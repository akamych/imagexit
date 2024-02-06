import { renderHook, RenderResult } from '@testing-library/react-hooks'
import { ICardElement } from '../types/game'
import { UseDrawCards } from './useDrawCards'
import { act } from '@testing-library/react-hooks'

let ctx: CanvasRenderingContext2D
let cardsElement: ICardElement[]
let gameStep: string
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
    gameStep = 'voting'

    result = renderHook(() =>
      UseDrawCards(
        ctx,
        cardsElement,
        setCardsElement,
        setSelectedCard,
        gameStep
      )
    ).result
  })

  it('Карточки корректно инициализируются', () => {
    act(() => {
      // Код, вызывающий обновление состояния компонента
      result.current.drawCards()
    })
    //result.current.drawCards()
    expect(ctx.clearRect).toHaveBeenCalled()
    // expect(ctx.drawImage).toHaveBeenCalled()
    expect(setCardsElement).toHaveBeenCalled()
  })

  it('Анимация карточек отрабатывает', () => {
    act(() => {
      result.current.animateCards(50, 50)
    })
  })

  it('После обновления данных в cardsElement происходит рендер', () => {
    const { rerender } = renderHook(
      ({ cards }) =>
        UseDrawCards(ctx, cards, setCardsElement, setSelectedCard, gameStep),
      { initialProps: { cards: cardsElement } }
    )

    const updatedCardsElement: ICardElement[] = [
      { id: 1, img: new Image(), left: 10, top: 10, width: 100, height: 100 },
      { id: 2, img: new Image(), left: 10, top: 10, width: 100, height: 100 },
      { id: 3, img: new Image(), left: 10, top: 110, width: 100, height: 100 },
      { id: 4, img: new Image(), left: 10, top: 210, width: 100, height: 100 },
    ]
    act(() => {
      rerender({ cards: updatedCardsElement })
    })

    expect(ctx.clearRect).toHaveBeenCalled()
    expect(ctx.drawImage).toHaveBeenCalled()
    expect(setCardsElement).toHaveBeenCalled()
  })
})
