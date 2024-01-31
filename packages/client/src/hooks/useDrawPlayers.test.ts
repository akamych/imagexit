import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import { ICardElement } from '../types/game'
import { UseDrawPlayers } from './useDrawPlayers'

let ctx: CanvasRenderingContext2D
let cardsElement: ICardElement[]
let result: RenderResult<{ generatePlayers: () => void }>

describe('UseDrawPlayers hook', () => {
  beforeEach(() => {
    ctx = {
      clearRect: jest.fn(),
      drawImage: jest.fn(),
      fillRect: jest.fn(),
    } as unknown as CanvasRenderingContext2D
    cardsElement = [
      { id: 1, img: new Image(), left: 0, top: 0, width: 100, height: 100 },
    ]

    result = renderHook(() => UseDrawPlayers(ctx, cardsElement)).result
  })

  it('Игроки успешно отрисовываются', () => {
    act(() => {
      result.current.generatePlayers()
    })
  })
})
