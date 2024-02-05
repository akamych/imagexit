import { useEffect, useState } from 'react'
import { gameSettings } from '../constants/game'

/**
 * Хук нужен для инициализации canvas
 * @argument ctx - основной слой контента
 * @argument ctx2 - слой анимации
 * @argument ctx3 - слой объектов с событиями
 * @returns ctx,  canvas, clearCanvas, ctx2б canvas2б clearCanvas2б ctx3б canvas3б clearCanvas3
 */
export const UseInitCanvas = () => {
  /** Основной слой контента */
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  /** Слой анимации */
  const [ctx2, setCtx2] = useState<CanvasRenderingContext2D | null>(null)
  const [canvas2, setCanvas2] = useState<HTMLCanvasElement | null>(null)
  /** Слой объектов с собыями */
  const [ctx3, setCtx3] = useState<CanvasRenderingContext2D | null>(null)
  const [canvas3, setCanvas3] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // ------- основной - фон
    const canvasInit: HTMLCanvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement
    setCanvas(canvasInit)
    const ctx = canvasInit.getContext('2d')
    setCtx(ctx)
    // ------- второй слой - анимация
    const canvas2Init: HTMLCanvasElement = document.getElementById(
      'canvas2'
    ) as HTMLCanvasElement
    setCanvas2(canvas2Init)
    const ctx2 = canvas2Init.getContext('2d')
    setCtx2(ctx2)
    // ------- третий слой - кликабильные элементы
    const canvas3Init: HTMLCanvasElement = document.getElementById(
      'canvas3'
    ) as HTMLCanvasElement
    setCanvas3(canvas3Init)
    const ctx3 = canvas3Init.getContext('2d')
    setCtx3(ctx3)
  }, [])
  /** Очистка основного слоя canvas */
  const clearCanvas = () => {
    if (!ctx) {
      return
    }
    ctx.clearRect(
      0,
      0,
      gameSettings.CANVAS_WIDTH_PX,
      gameSettings.CANVAS_HEIGHT_PX
    )
  }
  /** Очистка слоя анимации canvas */
  const clearCanvas2 = () => {
    if (!ctx2) {
      return
    }
    ctx2.clearRect(
      0,
      0,
      gameSettings.CANVAS_WIDTH_PX,
      gameSettings.CANVAS_HEIGHT_PX
    )
  }
  /** Очистка слоя объектов с событиями canvas */
  const clearCanvas3 = () => {
    if (!ctx3) {
      return
    }
    ctx3.clearRect(
      0,
      0,
      gameSettings.CANVAS_WIDTH_PX,
      gameSettings.CANVAS_HEIGHT_PX
    )
  }
  return {
    ctx,
    canvas,
    clearCanvas,
    ctx2,
    canvas2,
    clearCanvas2,
    ctx3,
    canvas3,
    clearCanvas3,
  }
}
