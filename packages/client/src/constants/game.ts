export const gameSettings = {
  CARD_LEFT_PX: 50,
  CARD_TOP_PX: 250,
  CARD_WIDTH_PX: 114,
  CARD_HEIGHT_PX: 174,

  GAME_BOARD_LEFT_PX: 300,
  GAME_BOARD_TOP_PX: 80,
  GAME_BOARD_HEIGHT_PX: 700,

  FIELD_WIDTH_PX: 70,
  FIELD_HEIGHT_PX: 70,

  PLAYER_WIDTH_PX: 20,
  PLAYER_HEIGHT_PX: 20,

  CONTENT_LEFT_PX: 250,
  CONTENT_TOP_PX: 0,
  CONTENT_WIDTH_PX: 500,
  CONTENT_HEIGHT_PX: 700,

  CANVAS_WIDTH_PX: 1000,
  CANVAS_HEIGHT_PX: 800,
}

export const playerColors = ['rgba(0,0,0,1)', 'green', 'rgba(255,255,255,1)', 'yellow', 'rgba(255,169,0,1)', 'blue', 'red']
type IgameContent = {
  [key: string]: {
    title: string
    task: string
    messageMaster?: string
    messagePlayer?: string
  }
}

export const stepsInTheGame = ['start', 'association', 'cards', 'voting', 'scoring', 'results', 'finish']

export const gameContent: IgameContent = {
  start: {
    title: 'Новая игра',
    task: 'Выберите режим, команду. Добавьте бота.',
  },
  association: {
    title: 'Придумать ассоциацию',
    task: 'Ведущий придумывает ассоциацию и загадывает карту. Игроки ждут.',
    messageMaster: 'Придумайте асоциацию и выберите карту.',
    messagePlayer: 'Ждем ведущего',
  },
  cards: {
    title: 'Выбрать карту к ассоциации',
    task: 'Игроки выбирают карту к ассоциации.',
    messageMaster: 'Ждем игроков',
    messagePlayer: 'Подберите карту к ассоциации ведущего',
  },
  voting: {
    title: 'Какую карту загадал ведущий?',
    task: 'Ведущему: показываем Игроки подобрали карты. Игрок голосует за карты др игроков',
    messageMaster: 'Ждем игроков.',
    messagePlayer: 'Угадайте карту, которую загадал ведущий',
  },
  scoring: {
    title: 'Результаты хода',
    task: 'Какие карты были выбраны игроками и за какие карты они голосовали',
    messageMaster: '',
    messagePlayer: '',
  },
  results: {
    title: 'Общие итоги',
    task: 'Подсчет голосов. Фишки на игровом поле',
    messageMaster: '',
    messagePlayer: '',
  },

  finish: { title: 'Победа', task: 'Общие результаты игры' },
}
// ==============================
export const typographySettings = {
  raund: {
    fontSize: 22,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: 10, top: 10 },
  },
  title: {
    fontSize: 22,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: gameSettings.CONTENT_WIDTH_PX / 2, top: 10 },
  },

  task: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: 50, top: 50 },
    width: 400,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: 50, top: 150 },
    width: 400,
  },
  smallText: {
    fontSize: 11,
    fontFamily: 'Arial',
    color: '#dedede',
  },
  textString: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: 50, top: 150 },
    width: 400,
  },
}
