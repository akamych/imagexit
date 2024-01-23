// PageProfile.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { Typography, Button, Modal, message, Form, Input } from 'antd'
import { Avatar } from '../../../components/Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { apiGetUserData } from './useHttp'
import styles from './styles.module.css'

const { Title, Paragraph } = Typography

type UserData = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  email: string
  phone: string
  rank: number
}

export const PageProfile: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isAuth, setAuth] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    id: 1349893,
    first_name: 'Mr',
    second_name: 'Random',
    display_name: 'mrrandom',
    login: 'mrrandom',
    avatar: 'https://github.com/shadcn.png',
    email: 'mr@random.com',
    phone: '123456789',
    rank: 1,
  })

  const handleSignIn = () => {
    const login = 'mrrandom'
    const password = 'Random123'

    fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ login, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Sign In Request failed with status ${response.status}`
          )
        }
        return response.json()
      })
      .then(data => {
        console.log('Sign In Response: ', data)
        handleUserData()
      })
      .catch(error => {
        console.error('Sign In Request failed', error)
      })
  }

  const handleUserData = async () => {
    fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Get User Data Request failed with status ${response.status}`
          )
        }
        return response.json()
      })
      .then(data => {
        console.log('User Data Response: ', data)
        setUserData(data)
        setAuth(true)
      })
      .catch(error => {
        console.error('Get User Data Request failed', error)
      })
  }

  useEffect(() => {
    handleUserData()
  }, [])

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
      <Avatar src={userData.avatar} width="100px"></Avatar>

      {/* Nickname */}
      <Title level={2}>
        {userData.first_name + ' ' + userData.second_name}
      </Title>

      {/* Player's Rank */}
      <Paragraph>Player's Rank: {userData.rank}</Paragraph>

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
      <Modal
        title="Change Password"
        open={isPasswordModalOpen}
        onCancel={handlePasswordCancel}
        footer={null}>
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
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter a new password!' },
            ]}>
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
