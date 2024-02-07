import {
  gameContent,
  gameSettings,
  typographySettings,
} from '../constants/game'

type IUseDrawContent = (ctx: CanvasRenderingContext2D | null) => {
  writeTitle: (text: string) => void
  writeTask: (text: string) => void
  writeText: (text: string, offsetTop: number) => void
  bgContent: () => void
  displayContent: (step: string) => void
}

/**
 * Хук нужен для отрисовки заголовков и текстов
 * @param ctx - canvas
 * @returns функции bgContent, writeTitle, writeTask, writeText, displayContent
 */
export const UseDrawContent: IUseDrawContent = ctx => {
  /**
   * Функция печатает текст с переносом слов в указанном диапазоне координат
   * @param ctx - canvas
   * @param text - текст для вывода
   * @param marginLeft - отступ слева от края canvas
   * @param marginTop - отступ сверху от края canvas
   * @param maxWidth - максимальная ширина текста
   * @param lineHeight - высота строки
   * @returns
   */
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
  /** Отрисовка фона */
  const bgContent = () => {
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

  /**
   * Выводит информацию о номере Раунда в игре
   * @param roundNumber
   * @returns
   */
  const writeRaundNumber = (roundNumber: number) => {
    if (!ctx) {
      return
    }
    ctx.font = `${typographySettings.title.fontSize}px ${typographySettings.title.fontFamily}`
    ctx.fillStyle = typographySettings.title.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'
    ctx.fillText(
      'Раунд ' + String(roundNumber),
      typographySettings.raund.offset.left,
      typographySettings.raund.offset.top
    )
  }
  /** Отрисовка Заголовка. Координаты и настройки прописаны в константах */
  const writeTitle = (text: string) => {
    if (!ctx) {
      return
    }
    ctx.font = `${typographySettings.title.fontSize}px ${typographySettings.title.fontFamily}`
    ctx.fillStyle = typographySettings.title.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    ctx.fillText(
      text,
      gameSettings.CONTENT_LEFT_PX + typographySettings.title.offset.left,
      gameSettings.CONTENT_TOP_PX + typographySettings.title.offset.top
    )
  }
  /** Отрисовка Задания. Координаты и настройки прописаны в константах */
  const writeTask = (text: string) => {
    if (!ctx) {
      return
    }
    ctx.font = `${typographySettings.task.fontSize}px ${typographySettings.task.fontFamily}`
    ctx.fillStyle = typographySettings.task.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'

    wrapText(
      ctx,
      text,
      gameSettings.CONTENT_LEFT_PX + typographySettings.task.offset.left,
      gameSettings.CONTENT_TOP_PX + typographySettings.task.offset.top,
      typographySettings.task.width,
      typographySettings.task.fontSize * 1.5
    )
  }
  /** Отрисовка текста. Координаты и настройки прописаны в константах */
  const writeText = (text: string, offsetTop: number) => {
    if (!ctx) {
      return
    }
    ctx.font = `${typographySettings.textString.fontSize}px ${typographySettings.textString.fontFamily}`
    ctx.fillStyle = typographySettings.textString.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'

    wrapText(
      ctx,
      text,
      gameSettings.CONTENT_LEFT_PX + typographySettings.textString.offset.left,
      gameSettings.CONTENT_TOP_PX + offsetTop,
      typographySettings.textString.width,
      typographySettings.textString.fontSize * 1.5
    )
  }
  /** Отрисовка заголовка, задания и текста для хода.*/
  const displayContent = (step: string) => {
    writeRaundNumber(3)
    writeTitle(gameContent[step].title)
    writeTask(gameContent[step].task)
  }

  return {
    bgContent,
    writeTitle,
    writeTask,
    writeText,
    displayContent,
  }
}
