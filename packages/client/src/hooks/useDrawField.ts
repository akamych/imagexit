import { useState } from 'react'
import { gameSettings } from '../constants/game'
import { ICellElement, IFieldElement } from '../types/game'

/*
 * Хук нужен для работы с игровым полем
 * */
export const UseDrawField = (ctx: CanvasRenderingContext2D | null) => {
  const [fieldsElement, setFieldsElement] = useState<ICellElement[]>([])
  // ====================== cell = ячейка игрового поля
  // картинка ячейки  игрового поля
  const img_cloud = new Image() // Image constructor
  img_cloud.src = '../../assets/images/cloud.png'
  img_cloud.alt = 'cloud'
  /*
   * Функция отрисовки клетки игрового поля
   * передаются координаты игровой клетки = x,y
   */
  const printСellBg = (
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number
  ) => {
    if (!ctx) {
      return
    }
    ctx.drawImage(
      img_cloud,
      x - 20,
      y,
      gameSettings.FIELD_WIDTH_PX + 40,
      gameSettings.FIELD_HEIGHT_PX
    )
  }
  /*
   * Функция отрисовки текста в центре клетки игрового поля
   * передаются координаты игровой клетки = x,y
   */
  const printСellText = (
    ctx: CanvasRenderingContext2D | null,
    text: string,
    x: number,
    y: number
  ) => {
    if (!ctx) {
      return
    }
    ctx.fillStyle = '#fff' // Белый цвет для цифры внутри
    ctx.font = '28px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const textX = x + gameSettings.FIELD_WIDTH_PX / 2
    const textY = y + gameSettings.FIELD_HEIGHT_PX / 2
    ctx.fillText(text, textX, textY)
  }
  /*
  Формирование массива координат ячеек
  */
  const arrayCoordinatesCells = (
    ctx: CanvasRenderingContext2D | null,
    numberСells: number
  ) => {
    if (!ctx) {
      return
    }

    const arr: ICellElement[] = []
    // начало координат игрового поля. Из левого нижнего угла.
    let x = 0 + gameSettings.FIELD_WIDTH_PX / 2
    let y = gameSettings.CANVAS_HEIGHT_PX

    let offset_design = false // смещение ячейки относительно оси для создания эффекта неравномеоности
    const offset_x = gameSettings.FIELD_WIDTH_PX + 30
    const offset_y = gameSettings.FIELD_HEIGHT_PX
    let directionMovement = -1 // направление движения. вверх= -1, вниз +1

    for (let i = 0; i < numberСells + 1; i++) {
      // проверка верхнего края поля
      if (directionMovement == -1) {
        // first
        if (y + directionMovement * offset_y < 0) {
          x += offset_x * 1.4
          directionMovement = -1 * directionMovement
          offset_design = false
        } else {
          // last
          if (y + directionMovement * offset_y * 2 < 0) {
            x += offset_x * 0.6
            offset_design = false
          }
          y += directionMovement * offset_y
        }
      } else {
        // проверка нижнего края поля
        // first
        if (
          y + directionMovement * offset_y * 2 >
          gameSettings.CANVAS_HEIGHT_PX
        ) {
          x += offset_x * 1.4
          directionMovement = -1 * directionMovement
          offset_design = false
        } else {
          // last
          if (
            y + directionMovement * offset_y * 3 >
            gameSettings.CANVAS_HEIGHT_PX
          ) {
            x += offset_x * 0.6
            offset_design = false
          }

          y += directionMovement * offset_y
        }
      }
      // --- дизайнерский отступ
      if (offset_design) {
        x += gameSettings.FIELD_WIDTH_PX * 0.3
      } else {
        x -= gameSettings.FIELD_WIDTH_PX * 0.3
      }
      offset_design = !offset_design
      // ---
      arr.push({
        x: x,
        y: y,
      })
      printСellBg(ctx, x, y) // отрисовка облака
      printСellText(ctx, i, x, y) // отрисовка текста в облаке
    }
    // 0 - ячейка старта

    console.log(arr)
    return arr
  }
  /*
   * Метод отрисовывает игровое поле
   * */
  const setPlace = () => {
    if (!ctx) {
      return
    }

    const arr: ICellElement[] | undefined = arrayCoordinatesCells(ctx, 39)

    if (arr) setFieldsElement(arr)
  }

  return {
    setPlace,
    fieldsElement,
  }
}
