import { Alert, Button, Form, Input } from 'antd'
import { useState } from 'react'
import { alertStyle } from '../../assets/antdStyle'

export const WForumTopicForm = () => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [statusForm, setStatusForm] = useState('')

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    setStatusForm('success')
    form.resetFields() // очистить поля формы
    setTimeout(() => {
      setStatusForm('') // закрыть сообщение об успешном сохранении
    }, 5000)
  }
  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        title: '',
        message: '',
      }}
      scrollToFirstError>
      {statusForm == 'success' && <Alert message="Топик успешно добавлен" type="success" style={alertStyle} />}
      {statusForm == 'error' && <Alert message="Ошибка" type="error" style={alertStyle} />}
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: 'Поле обязательно для заполнения',
          },
        ]}>
        <Input showCount minLength={5} maxLength={255} />
      </Form.Item>
      <Form.Item
        name="message"
        rules={[
          {
            required: true,
            message: 'Поле обязательно для заполнения',
          },
        ]}>
        <TextArea rows={6} showCount minLength={10} maxLength={1500} />
      </Form.Item>
      <Form.Item className="button-add">
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
