import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/Store'
import { selectUser } from '../../../store/reducers/AuthReducer'
import { selectAvatarSrc } from '../../../store/reducers/AvatarReducer'
import { Typography, Button, Modal, message, Form, Input } from 'antd'
import { Avatar } from '../../../components/Avatar/Avatar'
import styles from './styles.module.css'
import { logoutAction } from '../../../store/actions/AuthActions'
import { useDispatch } from 'react-redux'

const { Title } = Typography

const API_URL = 'https://ya-praktikum.tech/api/v2'
const RESOURCES = `${API_URL}/resources/`

export const PageProfile: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const user = useSelector((state: RootState) => selectUser(state))
  const avatarSrc = useSelector((state: RootState) => selectAvatarSrc(state))
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const handlePasswordChange = (values: unknown) => {
    message.success('Пароль успешно изменен')
    setIsPasswordModalOpen(false)
  }

  const handlePasswordCancel = () => {
    setIsPasswordModalOpen(false)
  }

  const showPasswordModal = () => {
    setIsPasswordModalOpen(true)
  }
  const Exit = () => {
    dispatch(logoutAction())
  }

  return (
    <div className={styles.content}>
      {/* Avatar */}
      {user && <Avatar src={RESOURCES + (avatarSrc || user.avatar) || ''} width="100px"></Avatar>}

      {/* Nickname */}
      {user && <Title level={2}>{user.first_name + ' ' + user.second_name}</Title>}

      {/* Player's Rank */}
      {/* {user && <Paragraph>Player's Rank: {user.rank}</Paragraph>} */}

      <div className={styles.btnGroup}>
        {/* Link to Change Password */}
        <Button type="link" onClick={showPasswordModal}>
          Сменить пароль
        </Button>

        {/* Exit Button */}
        <Button type="primary" danger className="exit-button" onClick={Exit}>
          Exit
        </Button>
      </div>

      {/* Change Password Modal */}
      <Modal title="Смена пароля" open={isPasswordModalOpen} onCancel={handlePasswordCancel} footer={null}>
        {/* Password Change Form */}
        <Form onFinish={handlePasswordChange}>
          {/* Current Password */}
          <Form.Item
            name="currentPassword"
            rules={[
              {
                required: true,
                message: 'Введите текущий пароль',
              },
            ]}>
            <Input.Password placeholder="Текущий пароль" />
          </Form.Item>

          {/* New Password */}
          <Form.Item name="newPassword" rules={[{ required: true, message: 'Введите новый пароль' }]}>
            <Input.Password placeholder="Новый пароль" />
          </Form.Item>

          {/* Repeat Password */}
          <Form.Item
            name="repeatPassword"
            rules={[
              { required: true, message: 'Повторите новый пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Пароли не совпадают')
                },
              }),
            ]}>
            <Input.Password placeholder="Повторите пароль" />
          </Form.Item>

          {/* Save Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
