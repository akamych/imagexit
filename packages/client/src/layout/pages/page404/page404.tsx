import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'

export const PageNotFound = () => {
  const { Title } = Typography
  return (
    <>
      <div className="content">
        <Title>Ошибка 404: Некорректный запрос</Title>
        <Title>¯\_(ツ)_/¯</Title>
        <p style={{ color: 'black' }}>
          Извините, произошла ошибка. Пожалуйста, проверьте ваш запрос и
          повторите попытку.
        </p>
        <Link to="/">Вернуться на главную страницу</Link>
      </div>
    </>
  )
}
