import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

export const PageMain = () => {
  return (
      <div className={styles.content}>
          <img src='https://playimaginarium.cosmodrome.games/_nuxt/img/logo.ce33400.png'/>
          <p>Онлайн версия популярной настольной игры.<br/>Начни играть прямо сейчас и погрузись в мир воображения!</p>
          <Button className={styles.playBtn} type="primary">
            Играть
          </Button>
      </div>
  );
};
