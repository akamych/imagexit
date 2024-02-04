import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // Импортируйте BrowserRouter
import { create } from 'match-media-mock'
import { PageGame } from './pageGame'
import { setupJestCanvasMock } from 'jest-canvas-mock'
import 'web-audio-mock'

describe('PageGame component', () => {
  beforeEach(() => {
    window.matchMedia = create()

    jest.resetAllMocks()
    setupJestCanvasMock()
  })

  it('Компонент рендерится', () => {
    const { container } = render(
      <BrowserRouter>
        <PageGame />
      </BrowserRouter>
    )

    expect(container).toBeInTheDocument()
  })
})
