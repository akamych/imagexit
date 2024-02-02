// import { useEffect, useState } from 'react'

import { useEffect, useState } from 'react'
import { UseDrawField } from '../../hooks/useDrawField'
import { UseDrawPlayers } from '../../hooks/useDrawPlayers'
import { gameSettings } from '../../constants/game'
import { ICellElement } from '../../types/game'

// import { gameSettings } from '../../constants/game'
interface IWStepScoring {
  ctx: CanvasRenderingContext2D | null
  fieldsElement: ICellElement[]
}
export const WStepScoring = (props: IWStepScoring) => {
  const { setPlace, fieldsElement } = UseDrawField(props.ctx)

  const [ctxLayer2, setCtxLayer2] = useState<CanvasRenderingContext2D | null>(
    null
  )
  const [canvasLayer2, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const clearCanvasLayer2 = () => {
    if (!ctxLayer2) {
      return
    }

    ctxLayer2.clearRect(
      0,
      0,
      gameSettings.CANVAS_WIDTH_PX,
      gameSettings.CANVAS_HEIGHT_PX
    )
  }
  const { generatePlayers } = UseDrawPlayers(ctxLayer2, props.fieldsElement)
  useEffect(() => {
    const canvasInit: HTMLCanvasElement = document.getElementById(
      'layer2'
    ) as HTMLCanvasElement
    setCanvas(canvasInit)
    const ctx2 = canvasInit.getContext('2d')
    setCtxLayer2(ctx2)
  }, [])
  useEffect(() => {
    generatePlayers()
  }, [ctxLayer2])

  return (
    <>
      WStepScoring
      <canvas
        id="layer2"
        className="layer layer2"
        width={gameSettings.CANVAS_WIDTH_PX}
        height={gameSettings.CANVAS_HEIGHT_PX}></canvas>
    </>
  )
}
