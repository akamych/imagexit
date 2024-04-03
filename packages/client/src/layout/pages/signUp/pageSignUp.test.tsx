import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // Импортируйте BrowserRouter
import { create } from 'match-media-mock'
import { PageSignUp } from './pageSignUp'
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
describe('PageSignUp component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', () => {
    const { container } = render(
      <BrowserRouter>
        <PageSignUp />
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })

  it('В компоненте присутствует кнопка: Создать аккаунт', () => {
    const { container } = render(
      <BrowserRouter>
        <PageSignUp />
      </BrowserRouter>
    )

    expect(container.innerHTML.indexOf('Создать аккаунт') >= 0).toBe(true)
  })

  it('В компоненте присутствуют inputs: login, first name, second name, phone, password, confirm', () => {
    const { container } = render(
      <BrowserRouter>
        <PageSignUp />
      </BrowserRouter>
    )

    expect(container.querySelector('#register_login')).not.toBeNull()
    expect(container.querySelector('#register_first_name')).not.toBeNull()
    expect(container.querySelector('#register_second_name')).not.toBeNull()
    expect(container.querySelector('#register_phone')).not.toBeNull()
    expect(container.querySelector('#register_password')).not.toBeNull()
    expect(container.querySelector('#register_confirm')).not.toBeNull()
  })
})
