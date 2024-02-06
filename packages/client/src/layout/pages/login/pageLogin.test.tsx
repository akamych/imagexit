import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // Импортируйте BrowserRouter
import { create } from 'match-media-mock'
import { PageLogin } from './pageLogin'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
describe('PageLogin component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', () => {
    const { container } = render(
      <BrowserRouter>
        <PageLogin />
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })

  it('В компоненте присутствуют кнопки: Войти, создать аккаунт', () => {
    const { container } = render(
      <BrowserRouter>
        <PageLogin />
      </BrowserRouter>
    )

    expect(container.innerHTML.indexOf('Войти') >= 0).toBe(true)
    expect(container.innerHTML.indexOf('создать аккаунт') >= 0).toBe(true)
  })

  it('В компоненте присутствуют inputs: username, password', () => {
    const { container } = render(
      <BrowserRouter>
        <PageLogin />
      </BrowserRouter>
    )

    expect(container.querySelector('#normal_login_login')).not.toBeNull()
    expect(container.querySelector('#normal_login_password')).not.toBeNull()
  })
})
