import React from 'react'

import { Breadcrumb, Layout, Typography } from 'antd'
import { WForumListTopics } from '../../../components/forum/WForumListTopics'
import './forum.css'

export const PageForum = () => {
  const { Title } = Typography
  const { Content } = Layout
  const breadcrumb = [
    {
      title: 'Главная',
    },
    {
      title: 'Форум',
    },
  ]
  return (
    <>
      <Content className="forum">
        <Breadcrumb items={breadcrumb} />
        <Title>Форум</Title>
        <WForumListTopics />
      </Content>
    </>
  )
}
