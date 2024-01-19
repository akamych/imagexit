import { useEffect, useState } from 'react'
import { gameSettings } from '../constants/game'

export const UseInitCanvas = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvasInit: HTMLCanvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement
    setCanvas(canvasInit)
    const ctx = canvasInit.getContext('2d')

    setCtx(ctx)
  }, [])

  const clearCanvas = () => {
    ctx &&
      ctx.clearRect(
        0,
        0,
        gameSettings.CANVAS_WIDTH_PX,
        gameSettings.CANVAS_HEIGHT_PX
      )
  }
  return { ctx, canvas, clearCanvas }
}
