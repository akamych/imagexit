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

export const sliderVertical: React.CSSProperties = {
  display: 'inline-block',
  height: 100,
  position: 'absolute',
  bottom: 5,
  right: -40,
}

export const sliderVerticalContainer: React.CSSProperties = {
  position: 'relative',
}
