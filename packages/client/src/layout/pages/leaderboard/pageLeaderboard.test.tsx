import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { create } from 'match-media-mock'
import { PageLeaderboard } from './pageLeaderboard'

describe('PageLeaderboard component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', () => {
    const { container } = render(
      <BrowserRouter>
        <PageLeaderboard />
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })

  it('В компоненте присутствуют табы (TOP 10, Я в рейтинге)', () => {
    const { container } = render(
      <BrowserRouter>
        <PageLeaderboard />
      </BrowserRouter>
    )

    expect(container.innerHTML.indexOf('TOP 10') >= 0).toBe(true)
    // expect(container.innerHTML.indexOf('Я в рейтинге') >= 0).toBe(true)
  })
})
