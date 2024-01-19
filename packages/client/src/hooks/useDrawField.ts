import { useState } from 'react'
import { gameSettings } from '../constants/game'
import { IFieldElement } from '../types/game'

export const UseDrawField = (ctx: CanvasRenderingContext2D | null) => {
  const [fieldsElement, setFieldsElement] = useState<IFieldElement[]>([])

  const setPlace = () => {
    if (!ctx) {
      return
    }

    let x = 0
    let y = gameSettings.CANVAS_HEIGHT_PX - gameSettings.FIELD_HEIGHT_PX
    let number = 0
    const arr: IFieldElement[] = []

    const drawFieldTop = () => {
      ctx.fillStyle = 'rgb(200, 0, 0)'
      ctx.fillRect(
        x,
        y,
        gameSettings.FIELD_WIDTH_PX,
        gameSettings.FIELD_HEIGHT_PX
      )
      arr.push({
        width: gameSettings.FIELD_WIDTH_PX,
        height: gameSettings.FIELD_HEIGHT_PX,
        top: y,
        left: x,
      })

      ctx.fillStyle = '#fff' // Белый цвет для цифры внутри
      ctx.font = '20px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const textX = x + gameSettings.FIELD_WIDTH_PX / 2
      const textY = y + gameSettings.FIELD_HEIGHT_PX / 2
      ctx.fillText(number.toString(), textX, textY)
      number += 1

      if (y > gameSettings.FIELD_HEIGHT_PX + 40) {
        y -= gameSettings.FIELD_HEIGHT_PX + 10
        x += 20
        drawFieldTop()
      }
    }

    const drawFieldBottom = () => {
      ctx.fillStyle = 'rgb(200, 0, 0)'
      ctx.fillRect(
        x,
        y,
        gameSettings.FIELD_WIDTH_PX,
        gameSettings.FIELD_HEIGHT_PX
      )

      arr.push({
        width: gameSettings.FIELD_WIDTH_PX,
        height: gameSettings.FIELD_HEIGHT_PX,
        top: y,
        left: x,
      })

      ctx.fillStyle = '#fff' // Белый цвет для цифры внутри
      ctx.font = '20px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const textX = x + gameSettings.FIELD_WIDTH_PX / 2
      const textY = y + gameSettings.FIELD_HEIGHT_PX / 2
      ctx.fillText(number.toString(), textX, textY)
      number += 1

      if (y < gameSettings.CANVAS_HEIGHT_PX - 140) {
        y += gameSettings.FIELD_HEIGHT_PX + 10
        drawFieldBottom()
      }
    }

    drawFieldTop()
    x += gameSettings.FIELD_WIDTH_PX + 10
    drawFieldBottom()
    x += gameSettings.FIELD_WIDTH_PX + 10
    drawFieldTop()
    x += gameSettings.FIELD_WIDTH_PX + 10
    drawFieldBottom()
    setFieldsElement(arr)
  }

  return {
    setPlace,
    fieldsElement,
  }
}
