import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { create } from 'match-media-mock'
import { PageLeaderboard } from './pageLeaderboard'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const mockReducers = {
  leaderboard: (state = { leaderboardData: [] }) => state,
}

describe('PageLeaderboard component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', () => {
    const mockStore = configureStore({ reducer: mockReducers })

    const { container } = render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <PageLeaderboard />
        </Provider>
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })

  it('В компоненте присутствуют табы (TOP 10)', () => {
    const mockStore = configureStore({ reducer: mockReducers })

    const { container } = render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <PageLeaderboard />
        </Provider>
      </BrowserRouter>
    )

    expect(container.innerHTML.indexOf('TOP 10') >= 0).toBe(true)
  })
})
