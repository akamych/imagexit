import { Breadcrumb, Layout } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { WForumListComments } from '../../../components/forum/WForumListComments'
import { WForumTopicContent } from '../../../components/forum/WForumTopicContent'
import '../../../assets/forum.css'

export const PageForumTopic = () => {
  const { Content } = Layout
  const { id } = useParams()
  const breadcrumb = [
    {
      title: 'Home',
    },
    {
      title: <Link to="/forum">Forum</Link>,
    },
    {
      title: `Топик #${id} Название ... `,
    },
  ]

  return (
    <>
      <Content className="forum">
        <Breadcrumb items={breadcrumb} />
        <WForumTopicContent />
        <WForumListComments />
      </Content>
    </>
  )
}
