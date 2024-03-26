import { playerColors } from '../../constants/game'
import { IPlayerInfo, IRaundInfo, IRaundPlayerInfo } from '../../types/game'
import { randomInteger } from '../../helpers/number'

export const dataRaundInfoTest: IRaundInfo = {
  id: 1,
  masterUserId: '',
  masterAssociation: 'Приятная суета',
  mastercardId: 5,
  players: [],
}

/*
 * Метод генерирует тестовые данные для указанного количества игроков
 * */
export const getPlayersJSON = (numberPlayers: number) => {
  const playerJSON = <IPlayerInfo[]>[]
  const points = <IRaundPlayerInfo[]>[]

  for (let i = 0; i < numberPlayers; i++) {
    playerJSON.push({
      userId: 'W3' + i,
      login: 'login ' + i + 1,
      color: playerColors[i],
      score: randomInteger(1, 25),
      selectedImageIndex: randomInteger(0, 5),
      scoreAdd: randomInteger(0, 3),
    })
    points.push({
      userId: 'W3' + i,
      selectedCard: i,
      master: i == 2 ? true : false,
      pointsOld: 15,
      pointsAdd: i == 2 ? -3 : i + 1,
      color: 'red',
    }) //  pointsAdd: i == 2 ? -3 : i + 1,
  }
  const pointsJSON: IRaundInfo = {
    id: 1,
    masterUserId: 'W32',
    masterAssociation: 'Приятная суета',
    mastercardId: 5,
    players: points,
  }
  return { playerJSON, pointsJSON }
}
export const getApiPlayersInfo = (numberPlayers: number) => {
  const { playerJSON } = getPlayersJSON(numberPlayers)
  return playerJSON
}
export const getApiRaundInfo = (numberPlayers: number) => {
  const { pointsJSON } = getPlayersJSON(numberPlayers)
  return pointsJSON
}

export const associations = [
  'Луна',
  'Красный фонарь',
  'Таинственный ключ',
  'Древний артефакт',
  'Поющий ветер',
  'Забытый лес',
  'Магический фонтан',
  'Звездный вихрь',
  'Призрачный маяк',
  'Искристый песок',
  'Часовой камень',
  'Тающий снег',
  'Скрытый портал',
  'Летучий корабль',
  'Звон колоколов',
  'Туманная долина',
  'Призрачный пейзаж',
  'Хранитель времени',
  'Озарение светом',
  'Камень мудрости',
  'Лунный свет',
  'Тайная дверь',
  'Древний свиток',
  'Поющий лист',
  'Забытая тропа',
  'Магический источник',
  'Звездный путь',
  'Призрачный след',
  'Искрящийся пламень',
  'Часовые механизмы',
  'Тающий лед',
  'Сокрытая крепость',
  'Летучая тень',
  'Звонкий эхо',
  'Туманный рассвет',
  'Призрачные следы',
  'Хранитель знаний',
  'Озаренные мысли',
  'Камень магии',
  'Золотой ключ',
]
