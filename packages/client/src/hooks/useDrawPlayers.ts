import { useEffect, useMemo, useRef, useState } from 'react'
import { gameSettings, playerColors } from '../constants/game'
import {
  ICellElement,
  IPlayerInfo,
  IRaundInfo,
  defaultIPlayersPoint,
} from '../types/game'
import { getPlayersJSON } from '../components/game/testData'

// ---------- Types
type UseDrawPlayers = (
  ctx: CanvasRenderingContext2D | null,
  fieldsElement: ICellElement[],
  animationField: boolean
) => {
  generatePlayers: () => void
}

type IanimationXYnow = {
  x: number
  y: number
  color: string
  moving: boolean // движется до поля... достиг точки
  stepX: number
  stepY: number
  pointStart: number
  goToCell?: number | null
  pointFinish: number
}

// ----------
const printCircl = (
  ctx: CanvasRenderingContext2D | null,
  centerX: number,
  centerY: number,
  color: string
) => {
  if (!ctx) {
    return
  }
  const radius = 10

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 30, false)
  ctx.fillStyle = color
  ctx.fill()
  ctx.lineWidth = 0
  ctx.strokeStyle = 'rgba(63,74,83,0.3)'
  ctx.stroke()
}
/*
 * getCoordinatesCell - функция вычисления сдвига координат фишки в ячейке для равномерного распределения игроков на поле вокруг цифры
 */
const getCoordinatesCell = (numberPlayers: number) => {
  const arr = []
  const R = gameSettings.FIELD_HEIGHT_PX * 0.4 // радиус окружности для размещения игроков.
  const corner = ((360 / numberPlayers) * Math.PI) / 180

  for (let i = 0; i < numberPlayers; i++) {
    arr.push({
      x: Math.round(R * Math.cos(i * corner)),
      y: Math.round(R * Math.sin(i * corner)),
    })
  }

  return arr
}
/*
 * Хук нужен для отрисовки игроков на игровом поле
 * */

export const UseDrawPlayers: UseDrawPlayers = (
  ctx,
  fieldsElement,
  animationField
) => {
  // fieldsElement - координаты ячеек игрового поля
  const [players, setPlayers] = useState<IPlayerInfo[]>([]) // информация о игроках: логин и пр
  const [points, setPoints] = useState<IRaundInfo>(defaultIPlayersPoint) // баллы игроков за ход
  const [animationXY, setAnimationXY] = useState<IanimationXYnow[]>([])
  const updateAnimationXY = (index: number, newItem: any) => {
    setAnimationXY(prevItems => {
      const newItems = [...prevItems] // Создаем копию массива
      newItems[index] = newItem // Меняем элемент в заданном индексе
      return newItems // Возвращаем новый массив
    })
  }
  const activeIndex = useRef<number | null>(null) // активная фишка при движении
  // ------  координаты игрока в одной ячейки
  const coordsOnCell = useMemo(() => {
    // вычисляет только если изменились кол-во игроков
    return getCoordinatesCell(players.length)
  }, [players])

  // const R = gameSettings.FIELD_HEIGHT_PX * 0.4 // радиус окружности для размещения игроков.
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
  /*
   * Тестовые данные Метод генерирует рандомное количество игроков и рандомно распределяет их по игровому полю
   * */
  const generatePlayers = () => {
    if (!ctx) {
      return
    }
    //clearCanvas()
    setAnimationXY([])
    const { playerJSON, pointsJSON } = getPlayersJSON()
    setPlayers(playerJSON)
    setPoints(pointsJSON)
    return true
  }

  // функция вычиляет координаты игрока на поле N в зависимости от количества игроков
  function coordinateCalculation(cellNumber: number, indexPlayer: number) {
    const x =
      fieldsElement[cellNumber].x +
      gameSettings.FIELD_HEIGHT_PX / 2 +
      coordsOnCell[indexPlayer].x
    const y =
      fieldsElement[cellNumber].y +
      gameSettings.FIELD_HEIGHT_PX / 2 +
      coordsOnCell[indexPlayer].y
    return { x, y }
  }
  //function animationOneStep(playerIndex, xy_now, point_way) {}

  // =============================== логика анимации общая
  function showAnimationOnTheBoard() {
    const offset = 1 // точка движения
    const index = activeIndex.current // номер  двигаемой фишки
    if (index == null || !animationXY[index]) {
      return
    }

    console.log('!! animationXY', animationXY)
    console.log('!! index', index)
    let moving = animationXY[index].moving
    // получение координат в ячейке N на месте игрока index
    console.log('animationXY' + index, animationXY[index])

    // координаты начала и окончания движения
    const x_start = animationXY[index].x
    const y_start = animationXY[index].y

    let goToCell = animationXY[index].goToCell // к  какой  точке движемся
    const moveSign = Math.sign(points.players[index].pointsAdd) // в какую сторону движемся
    // ---
    if (animationXY[index].moving == false) {
      if (goToCell != null && goToCell != animationXY[index].pointFinish) {
        goToCell = points.players[index].pointsOld + moveSign
      }
    }

    if (goToCell != null) {
      const { x: x_finish, y: y_finish } = coordinateCalculation(
        goToCell,
        index
      )

      // ---- уравнение прямой  on
      //const k = (y_finish - y_start) / (x_finish - x_start)
      //const b = y_start - k * x_start

      // ---- уравнение прямой  off

      let x_delta = Math.abs(x_finish - x_start)
      const x_sign = Math.sign(x_finish - x_start)

      let y_delta = Math.abs(y_finish - y_start)
      const y_sign = Math.sign(y_finish - y_start)

      console.log('goToCell', goToCell, 'x_delta', x_delta, 'y_delta', y_delta)

      let stepX = animationXY[index].stepX
      let stepY = animationXY[index].stepY
      if (x_delta == 0 && y_delta == 0) {
        moving = false
        stepX = 0
        stepY = 0
      } else {
        moving = true

        // равномерное движение
        if (stepY == 0 || stepX == 0) {
          stepY = offset // k * offset + b
          stepX = offset
        }
      }

      if (x_delta > 0) {
        x_delta -= stepX
      }
      if (x_delta < 0) {
        x_delta = 0
      }
      if (y_delta > 0) {
        y_delta -= stepY
      }
      if (y_delta < 0) {
        y_delta = 0
      }
      if (x_delta == 0 && y_delta == 0) {
        if (animationXY[index].pointFinish != goToCell) {
          goToCell += moveSign
          moving = true
        } else {
          // finish
          moving = false
          goToCell = null
          if (activeIndex.current != null) {
            activeIndex.current =
              animationXY.length >= activeIndex.current
                ? activeIndex.current + 1
                : null
          }
        }
      }
      updateAnimationXY(index, {
        x: x_finish - x_sign * x_delta,
        y: y_finish - y_sign * y_delta,
        color: animationXY[index].color,
        moving: moving,
        stepX: stepX,
        stepY: stepY,
        pointStart: animationXY[index].pointStart,
        goToCell: goToCell,
        pointFinish:
          points.players[index].pointsOld + points.players[index].pointsAdd,
      })
      console.log('x_delta', x_delta, 'y_delta', y_delta)

      //if (x_delta > 0 || y_delta > 0) {}
    } // off ==== if (goToCell != null)

    return true
  }

  // ---
  useEffect(() => {
    // const arrCoordCell = getCoordinatesCell(points.players.length)
    console.log('useEffect points', points)

    //отрисовка стартовой позиции игроков
    let animationFlag = false
    const arrayXY: IanimationXYnow[] = []
    points.players.forEach((item, index) => {
      // getPoints(player.userId)
      if (item.pointsAdd != 0) {
        animationFlag = true
      }
      const { x, y } = coordinateCalculation(item.pointsOld, index)
      arrayXY.push({
        x: x,
        y: y,
        color: playerColors[index],
        moving: false,
        stepX: 0,
        stepY: 0,
        pointStart: points.players[index].pointsOld,
        goToCell:
          points.players[index].pointsOld +
          Math.sign(points.players[index].pointsAdd),
        pointFinish:
          points.players[index].pointsOld + points.players[index].pointsAdd,
      })
    })
    setAnimationXY(arrayXY)
    console.log('setAnimationXY')

    // если  animationFlag = true - нужа анимация
    console.log('animationFlag', animationFlag)
    if (animationFlag) {
      activeIndex.current = 0 // номер  двигаемой фишки
    }
  }, [points])

  useEffect(() => {
    console.log('useEffect activeIndex')
    if (activeIndex.current != null) {
      showAnimationOnTheBoard()
    }
  }, [activeIndex.current])

  useEffect(() => {
    console.log('useEffect animationXY')
    if (!ctx) {
      return
    }

    if (animationXY.length > 0) {
      clearCanvas()
      animationXY.forEach((item, index) => {
        printCircl(ctx, item.x, item.y, item.color)
      })
      setTimeout(() => {
        showAnimationOnTheBoard()
      }, 5)
    }
  }, [animationXY])

  useEffect(() => {
    console.log('useEffect animationField')
    if (animationField == false) {
      activeIndex.current = null
      setAnimationXY([])
      clearCanvas()
    }
  }, [animationField])

  return {
    generatePlayers,
  }
}
