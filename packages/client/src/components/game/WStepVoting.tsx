import { useEffect } from 'react'
import { UseDrawContent } from '../../hooks/useDrawContent'
import { UseInitCanvas } from '../../hooks/useInitCanvas'
import { UseGameCore } from '../../hooks/useGameCore'

interface IWStepVoting {
  ctx: CanvasRenderingContext2D | null
  init: boolean
}

export const WStepVoting = (props: IWStepVoting) => {
  const { writeTitle, bgContent: bg_content, writeTask } = UseDrawContent(props.ctx)
  const { clearCanvas } = UseInitCanvas()

  const initStep = () => {
    clearCanvas()
    bg_content()
    writeTitle('Шаг 4. Голосование')
    writeTask('Команда, ваши карты, ведущий')
  }

  useEffect(() => {
    if (props.init) {
      initStep()
    }
  }, [props.init])

  return <></>
}
