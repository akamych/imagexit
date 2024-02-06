import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // Импортируйте BrowserRouter
import { create } from 'match-media-mock'
import { PageMain } from './pageMain'

describe('PageLogin component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', () => {
    const { container } = render(
      <BrowserRouter>
        <PageMain />
      </BrowserRouter>
    )

    expect(container).toBeInTheDocument()
  })

  it('В компоненте присутствуют кнопка Играть', () => {
    const { container } = render(
      <BrowserRouter>
        <PageMain />
      </BrowserRouter>
    )

    expect(container.innerHTML.indexOf('Играть') >= 0).toBe(true)
  })
})
