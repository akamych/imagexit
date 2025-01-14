import { useEffect } from 'react'
import { UseDrawContent } from '../../hooks/useDrawContent'
import { UseInitCanvas } from '../../hooks/useInitCanvas'

interface IWStepVoting {
  ctx: CanvasRenderingContext2D | null
  init: boolean
}

export const WStepVoting = (props: IWStepVoting) => {
  const { writeTitle, bgContent, writeTask } = UseDrawContent(props.ctx)
  const { clearCanvas } = UseInitCanvas()

  const initStep = () => {
    clearCanvas()
    bgContent()
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
