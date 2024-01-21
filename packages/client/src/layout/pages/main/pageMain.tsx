import React from 'react';
import { Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const {Title} = Typography;

export const PageMain = () => {
  return (
      <div className={styles.content}>
          <Title>Там, где живут чудовища</Title>
          <Button className={styles.playBtn} type="primary">
            Play
          </Button>
      </div>
  );
};
