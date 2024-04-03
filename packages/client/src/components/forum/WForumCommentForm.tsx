import { Alert, Button, Form, Input } from 'antd'
import { useState } from 'react'
import { alertStyle } from '../../assets/antdStyle'

export const WForumCommentForm = () => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [statusForm, setStatusForm] = useState('')

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    setStatusForm('success')
    form.resetFields()
    setTimeout(() => {
      setStatusForm('')
    }, 5000)
  }
  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        message: '',
      }}
      scrollToFirstError>
      {statusForm == 'success' && <Alert message="Комментарий успешно добавлен" type="success" style={alertStyle} />}
      {statusForm == 'error' && <Alert message="Ошибка" type="error" style={alertStyle} />}
      <Form.Item
        name="message"
        rules={[
          {
            required: true,
            message: 'Поле обязательно для заполнения',
          },
        ]}>
        <TextArea rows={6} showCount minLength={10} maxLength={500} />
      </Form.Item>
      <Form.Item className="button-add">
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
