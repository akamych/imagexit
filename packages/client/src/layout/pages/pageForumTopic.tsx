import { Typography } from 'antd'
import { useParams } from 'react-router-dom'

export const PageForumTopic = () => {
  const { Title } = Typography
  const { id } = useParams()
  return (
    <>
      <Title>Cтраница форума. Топик #{id}</Title>
    </>
  )
}
