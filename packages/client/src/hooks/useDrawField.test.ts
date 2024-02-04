import { renderHook } from '@testing-library/react-hooks'
import { UseDrawField } from './useDrawField'
import { act } from '@testing-library/react'

let ctx: CanvasRenderingContext2D

describe('UseDrawField Hook', () => {
  beforeEach(() => {
    ctx = {
      clearRect: jest.fn(),
      drawImage: jest.fn(),
      fillRect: jest.fn(),
      fillText: jest.fn(),
    } as unknown as CanvasRenderingContext2D
  })

  it('Игровое поле корректно отрисовывается', async () => {
    await act(async () => {
      const { result } = renderHook(() => UseDrawField(ctx))

      result.current.setPlace()

      expect(ctx.drawImage).toHaveBeenCalled()
      // expect(ctx.fillRect).toHaveBeenCalled()
      expect(ctx.fillText).toHaveBeenCalled()
    })
  })
})
