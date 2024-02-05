import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const PageMain = () => {
  return (
    <div className={styles.content}>
      <img src="/assets/images/logo.png" />
      <h1>
        Онлайн версия популярной настольной игры.
        <br />
        Начни играть прямо сейчас и погрузись в мир воображения!
      </h1>
      <Link to="/play">
        <Button className={styles.playBtn} type="primary">
          Играть
        </Button>
      </Link>
    </div>
  )
}
