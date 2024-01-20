// PageProfile.tsx
import React, { useState } from 'react';
import { Typography, Button, Modal, message, Form, Input } from 'antd';
import { Avatar } from '../../../components/Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const { Title, Paragraph } = Typography;

type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
};

export const PageProfile: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    id: 1349893,
    first_name: 'Mr',
    second_name: 'Random',
    display_name: 'mrrandom',
    login: 'mrrandom',
    avatar: 'https://github.com/shadcn.png',
    email: 'mr@random.com',
    phone: '123456789',
  });

  const navigate = useNavigate();

  const handlePasswordChange = (values: unknown) => {
    // Your password change logic here
    console.log('Received values:', values);
    message.success('Password changed successfully!');
    setIsPasswordModalOpen(false);
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalOpen(false);
  };

  const showPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  return (
    <div className={styles.content}>
      {/* Avatar */}
      <Avatar src={userData.avatar} width="100px"></Avatar>

      {/* Nickname */}
      <Title level={2}>Nickname</Title>

      {/* Player's Rank */}
      <Paragraph>Player's Rank: 1st</Paragraph>

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
          }}
        >
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
            ]}
          >
            <Input.Password placeholder="Current Password" />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter a new password!' },
            ]}
          >
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
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match!');
                },
              }),
            ]}
          >
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
);
};
