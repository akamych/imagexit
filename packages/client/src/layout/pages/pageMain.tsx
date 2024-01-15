import { PageLinks } from './pageLinks'
import { Typography } from 'antd'

export const PageMain = () => {
  const { Title } = Typography
  return (
    <>
      <Title>Главная страница</Title>
      <PageLinks />
    </>
  )
}
