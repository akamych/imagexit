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
  raundInfo: IRaundInfo,
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
