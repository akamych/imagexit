import './pageSignUp.css'
import { Typography, Button, Form, Input, Select } from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export const PageSignUp = () => {
  const { Title } = Typography
  const { Option } = Select
  const [form] = Form.useForm()

  const onFinish = (values: unknown) => {
    console.log('Ждём реализации апи: ', values)
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  )

  return (
    <>
      <Title>Регистрация</Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '+7',
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError>
        <Form.Item
          name="login"
          label="Логин"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, укажите ваш логин для авторизации!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="first_name"
          label="Имя"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, укажите ваше имя!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="second_name"
          label="Фамилия"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, укажите вашу фамилию!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Неверный формат почты!',
            },
            {
              required: true,
              message: 'Укажите адрес вашей почты!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Номер телефона"
          rules={[{ required: true, message: 'Укажите ваш номер телефона!' }]}>
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Укажите ваш пароль!',
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Подтвердите пароль"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Подтвердите ваш пароль!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают!'))
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Создать аккаунт
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
