import { Alert, Button, Form, Input } from 'antd'
import { useState } from 'react'
import { alertStyle } from '../../assets/antdStyle'

export const WForumTopicForm = () => {
  const [form] = Form.useForm()
  const [statusForm, setStatusForm] = useState('')

  const onFinish = (values: any) => {
    setStatusForm('')
    console.log('Received values of form: ', values)
    setStatusForm('success')
    form.resetFields()
    setTimeout(() => {
      setStatusForm('')
    }, 5000)
  }
  return (
    <>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          title: '',
          message: '',
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError>
        {statusForm == 'success' && (
          <Alert
            message="Топик успешно добавлен"
            type="success"
            style={alertStyle}
          />
        )}
        {statusForm == 'error' && (
          <Alert message="Ошибка" type="error" style={alertStyle} />
        )}
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
          <Input.TextArea showCount minLength={10} maxLength={1500} />
        </Form.Item>
        <Form.Item className="button-add">
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
