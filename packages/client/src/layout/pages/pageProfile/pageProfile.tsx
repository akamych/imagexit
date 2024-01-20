import { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Modal,
  Upload,
  message,
  GetProp,
  UploadProps,
  Form,
  Input,
} from 'antd';
import {Avatar} from '../../../components/Avatar/Avatar';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const { Title, Paragraph } = Typography;

export const PageProfile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [userData, setUserData] = useState({
      "id": 1349893,
      "first_name": "Mr",
      "second_name": "Random",
      "display_name": "mrrandom",
      "login": "mrrandom",
      "avatar": "/d48fddcf-5954-454e-8cc7-b4b9f6ce36ae/c0784cb2-1f55-41b5-8378-31455060d0ec_noroot.png",
      "email": "mr@random.com",
      "phone": "123456789"
  });

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log('fetching error');
      }
    };

    fetchUserData();
  }, []); 

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
      <Avatar src={userData.avatar}></Avatar>

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
      <Modal
        title="Change Password"
        open={isPasswordModalOpen}
        onCancel={handlePasswordCancel}
        footer={null}
      >
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
