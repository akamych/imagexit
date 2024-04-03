import { Button } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import { useEffect } from 'react'
import { oAuthConfirmRequest } from '../../../api/oauth.api'

export const PageMain = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')

  useEffect(() => {
    if (!code || code === null) {
      return
    }
    oAuthConfirmRequest(code)
  }, [code])

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
