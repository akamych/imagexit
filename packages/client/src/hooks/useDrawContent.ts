import { gameContent, gameSettings } from '../constants/game'

type IUseDrawContent = (ctx: CanvasRenderingContext2D | null) => {
  writeTitle: (text: string) => void
  writeTask: (text: string) => void
  writeText: (text: string, offsetTop: number) => void
  bg_content: () => void
  displayContent: (step: string) => void
}

/*
 * хук нужен для отрисовки заголовков и текстов
 *
 *
 * */
export const UseDrawContent: IUseDrawContent = ctx => {
  // ======================= Параметры и координаты объектов на странице
  // color: '#676a6c',
  // --- ход
  const raund = {
    fontSize: 22,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: 10, top: 10 },
  }
  const title = {
    fontSize: 22,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: gameSettings.CONTENT_WIDTH_PX / 2, top: 10 },
  }
  // --- ход
  const task = {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: 50, top: 50 },
    width: 400,
  }
  const textString = {
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#fff',
    offset: { left: 50, top: 150 },
    width: 400,
  }

  // ===========================================
  // переносить текст
  function wrapText(
    ctx: CanvasRenderingContext2D | null,
    text: string,
    marginLeft: number,
    marginTop: number,
    maxWidth: number,
    lineHeight: number
  ) {
    if (!ctx) {
      return
    }
    const words = text.split(' ')
    const countWords = words.length
    let line = ''
    for (let n = 0; n < countWords; n++) {
      const testLine = line + words[n] + ' '
      const testWidth = ctx.measureText(testLine).width
      if (testWidth > maxWidth) {
        ctx.fillText(line, marginLeft, marginTop)
        line = words[n] + ' '
        marginTop += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, marginLeft, marginTop)
  }
  /*
   * Отрисовка фона
   */
  const bg_content = () => {
    if (!ctx) {
      return
    }
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.fillRect(
      gameSettings.CONTENT_LEFT_PX,
      gameSettings.CONTENT_TOP_PX,
      gameSettings.CONTENT_WIDTH_PX,
      gameSettings.CONTENT_HEIGHT_PX
    )
  }
  // информация о номере Раунда в игре
  const writeRaundNumber = (roundNumber: number) => {
    if (!ctx) {
      return
    }
    ctx.font = `${title.fontSize}px ${title.fontFamily}`
    ctx.fillStyle = title.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'
    ctx.fillText(
      'Раунд ' + String(roundNumber),
      raund.offset.left,
      raund.offset.top
    )
  }
  /*
   * Отрисовка одной карточки с заданым положением
   */
  const writeTitle = (text: string) => {
    if (!ctx) {
      return
    }
    ctx.font = `${title.fontSize}px ${title.fontFamily}`
    ctx.fillStyle = title.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    ctx.fillText(
      text,
      gameSettings.CONTENT_LEFT_PX + title.offset.left,
      gameSettings.CONTENT_TOP_PX + title.offset.top
    )
  }
  const writeTask = (text: string) => {
    if (!ctx) {
      return
    }
    ctx.font = `${task.fontSize}px ${task.fontFamily}`
    ctx.fillStyle = task.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'

    wrapText(
      ctx,
      text,
      gameSettings.CONTENT_LEFT_PX + task.offset.left,
      gameSettings.CONTENT_TOP_PX + task.offset.top,
      task.width,
      task.fontSize * 1.5
    )
  }
  const writeText = (text: string, offsetTop: number) => {
    if (!ctx) {
      return
    }
    ctx.font = `${textString.fontSize}px ${textString.fontFamily}`
    ctx.fillStyle = textString.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'

    wrapText(
      ctx,
      text,
      gameSettings.CONTENT_LEFT_PX + textString.offset.left,
      gameSettings.CONTENT_TOP_PX + offsetTop,
      textString.width,
      textString.fontSize * 1.5
    )
  }
  // useEffect(() => {}, [])

  const displayContent = (step: string) => {
    writeRaundNumber(3)
    // bg_content()
    writeTitle(gameContent[step].title)
    writeTask(gameContent[step].task)
  }

  return {
    bg_content,
    writeTitle,
    writeTask,
    writeText,
    displayContent,
  }
}
