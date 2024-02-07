import { useState } from 'react'
import { gameSettings } from '../constants/game'
import { ICellElement } from '../types/game'

/*
 * Хук нужен для работы с игровым полем
 * */
export const UseDrawField = (ctx: CanvasRenderingContext2D | null) => {
  const [fieldsElement, setFieldsElement] = useState<ICellElement[]>([])
  // ====================== cell = ячейка игрового поля
  // картинка ячейки  игрового поля
  const imgCloud = new Image() // Image constructor
  imgCloud.src = '../../assets/images/cloud.png'
  imgCloud.alt = 'cloud'
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
      imgCloud,
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
    const gameBoardOffsetTop = gameSettings.GAME_BOARD_TOP_PX
    const gameBoardBottomY =
      gameSettings.GAME_BOARD_HEIGHT_PX + gameBoardOffsetTop // высота игрового поля

    // начало координат игрового поля. Из левого нижнего угла.
    let x = gameSettings.GAME_BOARD_LEFT_PX // 0 + gameSettings.FIELD_WIDTH_PX / 2
    let y = gameBoardBottomY

    let offsetDesign = false // смещение ячейки относительно оси для создания эффекта неравномеоности
    const offsetX = gameSettings.FIELD_WIDTH_PX + 20
    const offsetY = gameSettings.FIELD_HEIGHT_PX
    let directionMovement = -1 // направление движения. вверх= -1, вниз +1

    for (let i = 0; i < numberСells + 1; i++) {
      // проверка верхнего края поля
      if (directionMovement == -1) {
        // first
        if (y + directionMovement * offsetY < gameBoardOffsetTop) {
          x += offsetX * 1.4
          directionMovement = -1 * directionMovement
          offsetDesign = false
        } else {
          // last
          if (y + directionMovement * offsetY * 2 < gameBoardOffsetTop) {
            x += offsetX * 0.7
            offsetDesign = false
          }
          y += directionMovement * offsetY
        }
      } else {
        // проверка нижнего края поля
        // first
        if (y + directionMovement * offsetY * 2 > gameBoardBottomY) {
          x += offsetX * 1.4
          directionMovement = -1 * directionMovement
          offsetDesign = false
        } else {
          // last
          if (y + directionMovement * offsetY * 3 > gameBoardBottomY) {
            x += offsetX * 0.7
            offsetDesign = false
          }

          y += directionMovement * offsetY
        }
      }
      // --- дизайнерский отступ
      if (offsetDesign) {
        x += gameSettings.FIELD_WIDTH_PX * 0.3
      } else {
        x -= gameSettings.FIELD_WIDTH_PX * 0.3
      }
      offsetDesign = !offsetDesign
      // ---
      arr.push({
        x: x,
        y: y,
      })
      printСellBg(ctx, x, y) // отрисовка облака
      printСellText(ctx, i == 0 ? 'старт' : String(i), x, y) // отрисовка текста в облаке
    }

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
