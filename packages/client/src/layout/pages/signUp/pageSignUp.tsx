import { AppDispatch } from '../../../store/Store'
import { useDispatch, useSelector } from 'react-redux'
import {
  validateLoginCharacters,
  validateNotOnlyNumbers,
  validateContainsCapitalLetter,
  validateContainsNumber,
  validateOnlyNumbers,
  validateNameCharacters,
  validateFirstLetterIsCapital,
} from '../../../utils/InputUtil'
import './pageSignUp.css'
import { Typography, Button, Form, Input, Select } from 'antd'
import { selectError } from '../../../store/reducers/AuthReducer'
import { SignUpDto } from '../../../types/store'
import { signupAction } from '../../../store/actions/AuthActions'

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
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const authError = useSelector(selectError)

  const onFinish = (values: SignUpDto) => {
    const { first_name, second_name, login, email, password, phone } = values
    dispatch(
      signupAction({
        first_name,
        second_name,
        login,
        email,
        password,
        phone,
      })
    )
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select>
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
            {
              message: 'Недопустимый формат',
              validator: (_, value) => validateNameCharacters(value),
            },
            {
              message: 'С заглавной буквы, пожалуйста',
              validator: (_, value) => validateFirstLetterIsCapital(value),
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
            {
              message: 'Недопустимый формат',
              validator: (_, value) => validateNameCharacters(value),
            },
            {
              message: 'С заглавной буквы, пожалуйста',
              validator: (_, value) => validateFirstLetterIsCapital(value),
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
          rules={[
            { required: true, message: 'Укажите ваш номер телефона!' },
            { min: 10, message: 'Не менее 10 символов.' },
            { max: 15, message: 'Не более 15 символов.' },
            {
              message: 'Допустимы только цифры',
              validator: (_, value) => validateOnlyNumbers(value),
            },
          ]}>
          <Input addonBefore={prefixSelector} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Укажите ваш пароль!',
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
        {authError && <p>{authError}</p>}
      </Form>
    </>
  )
}
