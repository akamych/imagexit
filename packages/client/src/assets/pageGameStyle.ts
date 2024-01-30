import { gameSettings } from '../constants/game'

export const inputContainer: React.CSSProperties = {
  margin: '20px 0',
  display: 'flex',
  justifyContent: 'center',
}

export const actionContainer: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: gameSettings.CANVAS_WIDTH_PX + 'px',
  margin: '0 auto',
}
