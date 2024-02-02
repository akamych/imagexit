import { playerColors } from '../../constants/game'
import { IPlayerInfoElement, IPlayerInfoPoint } from '../../types/game'

/*
 * Метод генерирует рандомное количество игроков и рандомно распределяет их по игровому полю
 * */
export const getPlayersJSON = () => {
  const number = 3
  const playerJSON = <IPlayerInfoElement[]>[]
  const points = <IPlayerInfoPoint[]>[]

  for (let i = 0; i < number; i++) {
    playerJSON.push({
      userId: 'W3' + i,
      login: 'login ' + i,
      color: playerColors[i],
    })
    points.push({
      userId: 'W3' + i,
      selectedCard: i,
      master: i == 2 ? true : false,
      pointsOld: 20,
      pointsAdd: 3,
    })
  }
  const pointsJSON = {
    move_number: 5, // номер хода
    players: points,
  }
  return { playerJSON, pointsJSON }
}
