import { Typography, Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import './pageLogin.css'

export const PageLogin = () => {
  const { Title } = Typography

  const onFinish = values => {
    console.log('Ждёт реализации Апи', values)
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
          name="username"
          rules={[
            {
              required: true,
              message: 'Укажите ваш логин',
            },
          ]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Укажите ваш пароль',
            },
          ]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Войти
          </Button>
          или&nbsp;
          <NavLink to="/sign-up" rel="noopener noreferrer">
            создать аккаунт
          </NavLink>
        </Form.Item>
      </Form>
    </>
  )
}
