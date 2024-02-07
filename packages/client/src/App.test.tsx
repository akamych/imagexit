import '@testing-library/jest-dom'
import App from './App'
import { act, render } from '@testing-library/react'
import { create } from 'match-media-mock'
import 'react-redux'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

describe('App component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', async () => {
    await act(async () => {
      const { container } = render(<App />)
      expect(container).toBeInTheDocument()
    })
  })
})
