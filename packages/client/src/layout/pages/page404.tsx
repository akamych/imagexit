import { Typography } from 'antd'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  const { Title } = Typography
  return (
    <>
      <Title>404</Title>
      <Link to="/">Вернуться на главную страницу</Link>
    </>
  )
}
