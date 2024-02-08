import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/Store'
import { selectUser } from '../../../store/reducers/AuthReducer'
import { selectAvatarSrc } from '../../../store/reducers/AvatarReducer'
import { Typography, Button, Modal, message, Form, Input } from 'antd'
import { Avatar } from '../../../components/Avatar/Avatar'
import styles from './styles.module.css'

const { Title } = Typography

const API_URL = 'https://ya-praktikum.tech/api/v2'
const RESOURCES = `${API_URL}/resources/`

export const PageProfile: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const user = useSelector((state: RootState) => selectUser(state))
  const avatarSrc = useSelector((state: RootState) => selectAvatarSrc(state))

  const handlePasswordChange = (values: unknown) => {
    console.log('Received values:', values)
    message.success('Password changed successfully!')
    setIsPasswordModalOpen(false)
  }

  const handlePasswordCancel = () => {
    setIsPasswordModalOpen(false)
  }

  const showPasswordModal = () => {
    setIsPasswordModalOpen(true)
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
          Change Password
        </Button>

        {/* Exit Button */}
        <Button
          type="primary"
          danger
          className="exit-button"
          onClick={() => {
            /* Handle exit */
          }}>
          Exit
        </Button>
      </div>

      {/* Change Password Modal */}
      <Modal title="Change Password" open={isPasswordModalOpen} onCancel={handlePasswordCancel} footer={null}>
        {/* Password Change Form */}
        <Form onFinish={handlePasswordChange}>
          {/* Current Password */}
          <Form.Item
            name="currentPassword"
            rules={[
              {
                required: true,
                message: 'Please enter your current password!',
              },
            ]}>
            <Input.Password placeholder="Current Password" />
          </Form.Item>

          {/* New Password */}
          <Form.Item name="newPassword" rules={[{ required: true, message: 'Please enter a new password!' }]}>
            <Input.Password placeholder="New Password" />
          </Form.Item>

          {/* Repeat Password */}
          <Form.Item
            name="repeatPassword"
            rules={[
              { required: true, message: 'Please repeat your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('The two passwords do not match!')
                },
              }),
            ]}>
            <Input.Password placeholder="Repeat Password" />
          </Form.Item>

          {/* Save Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
