import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import { ICellElement } from '../types/game'
import { UseDrawPlayers } from './useDrawPlayers'

let ctx: CanvasRenderingContext2D
let fieldsElement: ICellElement[]
let animationField: boolean
let result: RenderResult<{ generatePlayers: () => void }>

describe('UseDrawPlayers hook', () => {
  beforeEach(() => {
    ctx = {
      clearRect: jest.fn(),
      drawImage: jest.fn(),
      fillRect: jest.fn(),
    } as unknown as CanvasRenderingContext2D

    fieldsElement = [{ x: 0, y: 0 }]
    animationField = true

    result = renderHook(() =>
      UseDrawPlayers(ctx, fieldsElement, animationField)
    ).result
  })

  it('Игроки успешно отрисовываются', () => {
    act(() => {
      result.current.generatePlayers()
    })
  })
})
