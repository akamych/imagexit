import { Typography, Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './pageLogin.css'
import { validateLoginCharacters, validateNotOnlyNumbers, validateContainsCapitalLetter, validateContainsNumber } from '../../../utils/InputUtil'
import { selectError } from '../../../store/reducers/AuthReducer'
import { AppDispatch } from '../../../store/Store'
import { loginAction } from '../../../store/actions/AuthActions'
import { LoginDto } from '../../../types/store'

export const PageLogin = () => {
  const { Title } = Typography
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const authError = useSelector(selectError)
  const onFinish = (values: LoginDto) => {
    const { login, password } = values
    dispatch(loginAction({ login, password }))
  }

  return (
    <>
      <Title>Авторизация</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: 'Укажите ваш логин',
            },
            { min: 3, message: 'Не менее 3 символов.' },
            { max: 20, message: 'Не более 20 символов.' },
            {
              message: 'Недопустимые символы',
              validator: (_, value) => validateLoginCharacters(value),
            },
            {
              message: 'Недопустимы только цифры',
              validator: (_, value) => validateNotOnlyNumbers(value),
            },
          ]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />} placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Укажите ваш пароль',
            },
            { min: 8, message: 'Не менее 8 символов.' },
            { max: 40, message: 'Не более 40 символов.' },
            {
              message: 'Должна присутствовать хотя бы одна цифра',
              validator: (_, value) => validateContainsNumber(value),
            },
            {
              message: 'Должна присутствовать хотя бы одна заглавная буква',
              validator: (_, value) => validateContainsCapitalLetter(value),
            },
          ]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />} type="password" placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>запомнить меня</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Забыли пароль?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
          или&nbsp;
          <NavLink to="/sign-up" rel="noopener noreferrer">
            создать аккаунт
          </NavLink>
        </Form.Item>

        {authError && <p>{authError}</p>}
      </Form>
    </>
  )
}
