import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const Error500 = () => {
  const { Title } = Typography
  return (
    <>
      <div className={styles.content}>
        <Title>Ошибка 500: Internal Server Error</Title>
        <Title>¯\_(ツ)_/¯</Title>
        <p style={{ color: 'black' }}>
          Извините, что-то пошло не так на нашей стороне. Мы работаем над
          устранением проблемы. Пожалуйста, повторите попытку позже.
        </p>
        <Link to="/">Вернуться на главную страницу</Link>
      </div>
    </>
  )
}
