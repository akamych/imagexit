import { useEffect, useMemo, useRef, useState } from 'react'
import { gameSettings, playerColors } from '../constants/game'
import { ICellElement, IPlayerInfo, IRaundInfo, defaultIPlayersPoint, IRaundPlayerInfo } from '../types/game'
import { getPlayersJSON } from '../components/game/testData'
import { writeLogin } from '../components/game/lib'

type UseDrawPlayers = (
  ctx: CanvasRenderingContext2D | null,
  fieldsElement: ICellElement[],
  animationField: boolean
) => {
  generatePlayers: (players: IPlayerInfo[], mastercardIndex: number | undefined, masterUserId: string) => void
}

/**
 * Данные положения фишки: откуда движется, куда, где находится сейчас
 * @param x - координата где сейчас находится
 * @param y - координата где сейчас находится
 * @param color - цвет фишки
 * @param moving - false - достиг точки  , true - движется к точке
 * @param k - коэфициент в уравнении y=kx+b
 * @param b - коэфициент в уравнении y=kx+b
 * @param pointStart -  номер стартовой ячейки на игровом поле
 * @param goToCell - к какой ячейке сейчас движется. По умолчанию - стартовая
 * @param pointFinish - номер финальной ячейки на игровом поле
 */
type IAnimationXYNow = {
  x: number
  y: number
  color: string
  moving: boolean // движется до поля... достиг точки
  k: number
  b: number
  pointStart: number
  goToCell?: number | null
  pointFinish: number
}

/**
 * Функция рисования фишки игрока
 * @param ctx - Canvas анимации
 * @param centerX - x координата центра круга
 * @param centerY - y координаты центра круга
 * @param color - цвет фишки
 * @returns
 */
const drawCircle = (ctx: CanvasRenderingContext2D | null, centerX: number, centerY: number, color: string) => {
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

/**
 * Функция вычисляет сдвиг координат фишки в ячейке для равномерного распределения игроков
 * на поле вокруг цифры
 * @param numberPlayers - порядковый номер игрока в списке
 * @returns - {x,y} сдвиг по координатам от центра ячейки
 */
const getCoordinatesCell = (numberPlayers: number) => {
  const arr = []
  /**  Радиус окружности для равномерного размещения игроков */
  const R = gameSettings.FIELD_HEIGHT_PX * 0.4
  const corner = ((360 / numberPlayers) * Math.PI) / 180

  for (let i = 0; i < numberPlayers; i++) {
    arr.push({
      x: Math.round(R * Math.cos(i * corner)),
      y: Math.round(R * Math.sin(i * corner)),
    })
  }
  return arr
}

/**
 * Хук нужен для отрисовки игроков на игровом поле
 * @param {ICellElement[]} fieldsElement - координаты ячеек игрового поля
 * @param {boolean} animationField - активна ли анимация. false = если игровое поле скрывают
 */
export const UseDrawPlayers: UseDrawPlayers = (ctx, fieldsElement, animationField) => {
  const [players, setPlayers] = useState<IPlayerInfo[]>([]) // информация о игроках: логин и пр
  const [points, setPoints] = useState<IRaundInfo>(defaultIPlayersPoint) // баллы игроков за ход

  /** Массив с координатами и коофициентами где сейчас находится фишка, из какой точки движется, в какую точку движется */
  const [animationXY, setAnimationXY] = useState<IAnimationXYNow[]>([])

  const updateAnimationXY = (index: number, newItem: IAnimationXYNow) => {
    setAnimationXY(prevItems => {
      const newItems: IAnimationXYNow[] = [...prevItems] // Создаем копию массива
      newItems[index] = newItem // Меняем элемент в заданном индексе
      return newItems // Возвращаем новый массив
    })
  }

  /** Индекс активной фишки. Ее передвигаем */
  const activeIndex = useRef<number | null>(null)

  /** Координаты игрока в одной ячейки. Вычисляет только если изменились кол-во игроков */
  const coordsOnCell = useMemo(() => {
    return getCoordinatesCell(players.length)
  }, [players])

  const clearCanvas = () => {
    if (!ctx) {
      return
    }
    ctx.clearRect(0, 0, gameSettings.CANVAS_WIDTH_PX, gameSettings.CANVAS_HEIGHT_PX)
  }

  /*
   * Тестовые данные Метод генерирует рандомное количество игроков и рандомно распределяет их по игровому полю
   * */
  const generatePlayers = (players: IPlayerInfo[], mastercardIndex: number | undefined, masterUserId: string) => {
    if (!ctx) {
      return
    }
    clearCanvas()
    setAnimationXY([])
    setPlayers(players)

    const pointsJSON: IRaundInfo = {
      id: 1,
      masterUserId: masterUserId,
      masterAssociation: 'Приятная суета',
      mastercardId: mastercardIndex,
      players: players.map(i => {
        return {
          color: i.color,
          userId: i.userId,
          selectedCard: i.selectedImageIndex,
          master: false,
          pointsOld: i.score > 0 ? i.score - i.scoreAdd : 0,
          pointsAdd: i.scoreAdd,
        } as IRaundPlayerInfo
      }),
    }

    setPoints(pointsJSON)
    return true
  }

  /** Функция вычиcляет координаты игрока на поле N в зависимости от количества игроков
   * @param cellNumber - номер ячейки на игровом поле
   * @param indexPlayer - номер игрока относительно распределения по кругу внутри ячейки игрового поля
   */
  function coordinateCalculation(cellNumber: number, indexPlayer: number) {
    const x = fieldsElement[cellNumber].x + gameSettings.FIELD_WIDTH_PX / 2 + coordsOnCell[indexPlayer].x
    const y = fieldsElement[cellNumber].y + gameSettings.FIELD_HEIGHT_PX / 2 + coordsOnCell[indexPlayer].y
    return { x, y }
  }

  /**
   * Функция анимации фишек на поле
   * @description Если анимация разрешена, то фишки передвигаются по очереди
   */
  function showAnimationOnTheBoard() {
    /** Шаг передвижения фишки */
    const offset = 1
    if (animationXY.length == 0 || activeIndex.current == null) {
      return
    }
    /** Номер активной передвигаемой фишки = номер игрока по порядку  */
    const index = activeIndex.current

    if (!animationXY[index]) {
      return
    }

    /**  moving - переменная. Значения: false - достиг точки  , true - движется к точке  */
    let moving = animationXY[index].moving

    /** Номер поля куда движется фишка */
    let goToCell = animationXY[index].goToCell

    /** координаты где сейчас расположена фишка */
    let x = animationXY[index].x
    let y = animationXY[index].y

    /** коэфффициент линейной функции */
    let k = animationXY[index].k
    let b = animationXY[index].b

    /** Если фишка находится в ячейке на своем месте и не движется*/
    if (!moving) {
      /** Если промежуточная ячейка и не равна финальной */
      if (typeof goToCell === 'number' && goToCell !== animationXY[index].pointFinish) {
        goToCell += 1 // вычисляем следующую ячейку
        moving = true

        /** Координаты точки назначения - точку назначения только установили*/
        const { x: xFinish, y: yFinish } = coordinateCalculation(goToCell, index)

        /** коофициенты уравнения прямой y=kx+b */
        k = (yFinish - y) / (xFinish - x)
        b = y - k * x
      }
    }
    if (goToCell != null && moving) {
      /** Координаты точки назначения */
      const { x: xFinish, y: yFinish } = coordinateCalculation(goToCell, index)

      const xDelta = Math.abs(xFinish - x)
      const xSign = Math.sign(xFinish - x)
      const yDelta = Math.abs(yFinish - y)

      if (xDelta == 0 && yDelta == 0) {
        moving = false

        // ---- Finish
        if (goToCell === animationXY[index].pointFinish) {
          activeIndex.current = animationXY.length >= activeIndex.current ? activeIndex.current + 1 : null
        }
      } else {
        moving = true
      }
      x = x + xSign * offset
      y = k * x + b

      updateAnimationXY(index, {
        x: x,
        y: y,
        color: animationXY[index].color,
        moving: moving,
        k: k,
        b: b,
        pointStart: animationXY[index].pointStart,
        goToCell: goToCell,
        pointFinish: points.players[index].pointsOld + points.players[index].pointsAdd,
      })
    }
  }

  /** Отрисовка стартовой позиции игроков */
  useEffect(() => {
    let animationFlag = false

    /** массив начальных положений фишек */
    const arrayXY: IAnimationXYNow[] = []
    points.players.forEach((item, index) => {
      if (item.pointsAdd != 0) {
        animationFlag = true
      }
      const { x, y } = coordinateCalculation(item.pointsOld, index)
      arrayXY.push({
        x: x,
        y: y,
        color: item.color,
        moving: false,
        k: 0,
        b: 0,
        pointStart: item.pointsOld,
        goToCell: item.pointsOld,
        pointFinish: item.pointsOld + item.pointsAdd,
      })
    })
    setAnimationXY(arrayXY)

    /**  Включение анимации */
    if (animationFlag) {
      activeIndex.current = 0
    }
  }, [points])

  useEffect(() => {
    if (activeIndex.current != null) {
      showAnimationOnTheBoard()
    }
  }, [activeIndex.current])

  useEffect(() => {
    if (!ctx) {
      return
    }
    if (animationXY.length > 0) {
      clearCanvas()
      animationXY.forEach(item => {
        drawCircle(ctx, item.x, item.y, item.color)
      })
      setTimeout(() => {
        showAnimationOnTheBoard()
      }, 30)
    }
  }, [animationXY])

  useEffect(() => {
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
