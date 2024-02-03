import { useEffect, useState } from 'react'
import { gameSettings } from '../constants/game'
import {
  ICardElement,
  IFieldElement,
  IPlayerElement,
  IPlayerInfo,
} from '../types/game'
import { randomInteger } from '../helpers/number'
import { UseInitImage } from './useInitImage'
import { getApiPlayersInfo } from '../components/game/testData'

type UseDrawPlayersInfo = (
  ctx: CanvasRenderingContext2D | null,
  card: ICardElement
) => {
  updatePlayersInfo: () => void
}

const BoxWIDTH = 200
const BoxHEIGHT = 150
const Row1 = 200
const Row2 = 400
const Row3 = 600
const carsWIDTH = 100

const сoordinates = [
  { X: 0, Y: Row1, WIDTH: BoxWIDTH, HEIGHT: BoxHEIGHT },
  {
    X: gameSettings.CANVAS_WIDTH_PX - BoxWIDTH,
    Y: Row1,
    WIDTH: BoxWIDTH,
    HEIGHT: BoxHEIGHT,
  },
  { X: 0, Y: Row2, WIDTH: BoxWIDTH, HEIGHT: BoxHEIGHT },
  {
    X: gameSettings.CANVAS_WIDTH_PX - BoxWIDTH,
    Y: Row2,
    WIDTH: BoxWIDTH,
    HEIGHT: BoxHEIGHT,
  },
  { X: 0, Y: Row3, WIDTH: BoxWIDTH, HEIGHT: BoxHEIGHT },
  {
    X: gameSettings.CANVAS_WIDTH_PX - BoxWIDTH,
    Y: Row3,
    WIDTH: BoxWIDTH,
    HEIGHT: BoxHEIGHT,
  },
]

/*
 * Хук нужен для отрисовки информации о игроках
 * */
export const UseDrawPlayersInfo: UseDrawPlayersInfo = (ctx, card) => {
  const [players, setPlayers] = useState<IPlayerInfo[]>([])
  const fontSizeLogin = 18
  const offset = 30
  /*
   * Метод обновляет информацию о игроках
   * */
  const updatePlayersInfo = () => {
    setPlayers(getApiPlayersInfo)
  }

  useEffect(() => {
    if (!ctx) {
      return
    }

    players.forEach((player, index) => {
      ctx.fillStyle = player.color

      // очищает прямоугольную область
      ctx.clearRect(
        сoordinates[index].X,
        сoordinates[index].Y,
        carsWIDTH,
        сoordinates[index].HEIGHT
      )
      // заливает прямоугольную область
      ctx.fillRect(
        сoordinates[index].X,
        сoordinates[index].Y,
        carsWIDTH,
        сoordinates[index].HEIGHT
      )
      // cart

      ctx.drawImage(
        card.img,
        сoordinates[index].X,
        сoordinates[index].Y,
        carsWIDTH,
        сoordinates[index].HEIGHT
      )
      // Login
      ctx.font = `${fontSizeLogin}px serif`
      ctx.fillText(
        player.login,
        сoordinates[index].X + carsWIDTH + offset,
        сoordinates[index].Y + fontSizeLogin
      )
    })
  }, [players, ctx])

  return {
    updatePlayersInfo,
  }
}
