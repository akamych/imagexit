import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { gameSettings } from '../constants/game'
import { IFieldElement } from '../types/game'

type UseDrawPlayer = (
  ctx: CanvasRenderingContext2D | null,
  fieldsElement: IFieldElement[],
  setPlace: () => void
) => {
  setNext: Dispatch<SetStateAction<number>>
}
export const UseDrawPlayer: UseDrawPlayer = (ctx, fieldsElement, setPlace) => {
  const [next, setNext] = useState(0)

  useEffect(() => {
    if (!ctx) {
      return
    }
    if (fieldsElement[next - 1]) {
      ctx.clearRect(
        0,
        0,
        gameSettings.CANVAS_WIDTH_PX,
        gameSettings.CANVAS_HEIGHT_PX
      )
      setPlace()
      ctx.fillStyle = 'rgb(12,211,106)'
      ctx.fillRect(
        fieldsElement[next - 1].top + 25,
        fieldsElement[next - 1].left + 25,
        50,
        50
      )
      if (fieldsElement.length === next) {
        alert('Финиш')
      }
    }
  }, [next])

  return {
    setNext,
  }
}
