import { useCallback, useRef } from 'react'

type UseHandler = (elem: HTMLElement | null) => {
  addClick: (cb: (...props: any) => void) => void
  removeClick: (cb: (...props: any) => void) => void
}

/*
 *
 * */
export const UseHandler: UseHandler = elem => {
  const ref = useRef<(...props: any) => void>()

  const handlerClick = useCallback(
    (event: MouseEvent) => {
      if (!elem) {
        return
      }
      const elemRect = elem.getBoundingClientRect()

      //const elemLeft = elem.offsetLeft + elem.clientLeft
      //const elemTop = elem.offsetTop + elem.clientTop

      //const x = event.pageX - elemLeft - elemRect.left
      //const y = event.pageY - elemTop - elemRect.top
      const x = event.clientX - elemRect.left
      const y = event.clientY - elemRect.top

      console.log('handlerClick elem', x, y)
      ref.current && ref.current(x, y)
      removeClick()
    },
    [elem]
  )

  const addClick = (cb: (props: any) => void) => {
    ref.current = cb
    elem && elem.addEventListener('click', handlerClick, false)
  }

  const removeClick = () => {
    elem && elem.removeEventListener('click', handlerClick)
  }

  return {
    addClick,
    removeClick,
  }
}
