import { typographySettings } from '../../constants/game'
import { IPlayerInfo, IRaundInfo } from '../../types/game'

const drawAvatar = (
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

export const writeLogin = (
  ctx: CanvasRenderingContext2D | null,
  players: IPlayerInfo[],
  raundInfo: IRaundInfo | null,
  x: number,
  y: number
) => {
  if (!ctx) {
    return
  }
  let y_row = y

  players.forEach((player: IPlayerInfo, index) => {
    let x_row = x
    drawAvatar(
      ctx,
      x,
      y_row + typographySettings.text.fontSize / 2,
      player.color
    )
    x_row += 20
    ctx.font = `${typographySettings.text.fontSize}px ${typographySettings.text.fontFamily}`
    ctx.fillStyle = typographySettings.title.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'
    ctx.fillText(player.login, x_row, y_row)
    // ---
    if (raundInfo?.players[index]?.pointsOld) {
      ctx.font = `${typographySettings.smallText.fontSize}px ${typographySettings.smallText.fontFamily}`
      ctx.fillStyle = typographySettings.smallText.color
      x_row += ctx.measureText(player.login + ' ').width + 13
      ctx.fillText('баллы:', x_row, y_row)
      // ---
      ctx.font = `${typographySettings.text.fontSize}px ${typographySettings.text.fontFamily}`
      ctx.fillStyle = typographySettings.text.color
      x_row += ctx.measureText('баллы:').width

      const pointResult =
        raundInfo.players[index].pointsOld + raundInfo.players[index].pointsAdd
      ctx.fillText(
        pointResult + ' (' + raundInfo.players[index].pointsAdd + ')',
        x_row,
        y_row
      )
    }
    y_row += 30
  })
}

export const writeLoginFinish = (
  ctx: CanvasRenderingContext2D | null,
  players: IPlayerInfo[],
  raundInfo: IRaundInfo | null,
  x: number,
  y: number
) => {
  if (!ctx) {
    return
  }
  let y_row = y
  // картинка ячейки  игрового поля
  const img_winner = new Image() // Image constructor
  img_winner.src = '../../assets/images/winner.png'
  img_winner.alt = 'winner'
  ctx.drawImage(img_winner, x - 70, y, 300, 226)
  y_row += 250
  // ------
  ctx.font = `20px ${typographySettings.text.fontFamily}`
  ctx.fillStyle = typographySettings.title.color
  ctx.textBaseline = 'top'
  ctx.textAlign = 'start'
  ctx.fillText('Общий результат', x - 10, y_row)
  y_row += 40
  // ------
  players.forEach((player: IPlayerInfo, index) => {
    let x_row = x
    drawAvatar(
      ctx,
      x,
      y_row + typographySettings.text.fontSize / 2,
      player.color
    )
    x_row += 20
    ctx.font = `${typographySettings.text.fontSize}px ${typographySettings.text.fontFamily}`
    ctx.fillStyle = typographySettings.title.color
    ctx.textBaseline = 'top'
    ctx.textAlign = 'start'
    ctx.fillText(player.login, x_row, y_row)
    if (raundInfo?.players[index]?.pointsOld) {
      ctx.font = `${typographySettings.smallText.fontSize}px ${typographySettings.smallText.fontFamily}`
      ctx.fillStyle = typographySettings.smallText.color
      x_row += ctx.measureText(player.login + ' ').width + 13
      ctx.fillText('баллы:', x_row, y_row)
      // ---
      ctx.font = `${typographySettings.text.fontSize}px ${typographySettings.text.fontFamily}`
      ctx.fillStyle = typographySettings.text.color
      x_row += ctx.measureText('баллы:').width

      const pointResult = raundInfo.players[index].pointsOld
      ctx.fillText(pointResult + '', x_row, y_row)
    }
    y_row += 30
  })
}
// ----------------- скругление краев кнопки
export function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  r = Math.min(w, h) / 2 > r ? r : Math.min(w, h) / 2
  return `M ${x + r} ${y} l ${w - 2 * r} 0 q ${r} 0 ${r} ${r}
      l 0 ${h - 2 * r} q 0 ${r} ${-r} ${r}
      l ${-w + 2 * r} 0 q ${-r} 0 ${-r} ${-r}
      l 0 ${-h + 2 * r} q 0 ${-r} ${r} ${-r}`
}

export const buttonCanvas = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null,
  colorbg: string,
  str: string,
  color: string,
  imageX: number,
  imageY: number,
  imageWidth: number,
  imageHeight: number,
  fn: () => void
) => {
  if (!ctx) {
    return
  }
  if (!canvas) {
    return
  }
  ctx.save()
  ctx.fillStyle = colorbg
  ctx.fill(
    new Path2D(roundedRectPath(imageX, imageY, imageWidth, imageHeight, 10))
  )
  ctx.font = `${typographySettings.text.fontSize}px ${typographySettings.text.fontFamily}`
  //- ---
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(str, imageX + imageWidth / 2, imageY + imageHeight / 2)
  ctx.restore()
  // ---
  canvas.addEventListener(
    'click',
    (event: any) => {
      const isClickedInsideImage =
        event.offsetX >= imageX &&
        event.offsetX <= imageX + imageWidth &&
        event.offsetY >= imageY &&
        event.offsetY <= imageY + imageHeight

      if (isClickedInsideImage) {
        fn()
      }
    },
    false
  )
}
