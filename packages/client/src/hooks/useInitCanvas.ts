import { useEffect, useState } from 'react'

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
  return { ctx, canvas }
}
