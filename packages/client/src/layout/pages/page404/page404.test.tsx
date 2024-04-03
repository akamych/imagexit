import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // Импортируйте BrowserRouter
import { create } from 'match-media-mock'
import { PageNotFound } from './page404'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('PageNotFound component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', () => {
    const { container } = render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    )

    expect(container).toBeInTheDocument()
  })
})
