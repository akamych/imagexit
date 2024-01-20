import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Divider, List, Modal } from 'antd'
import { LikeOutlined, UserOutlined } from '@ant-design/icons'
import { WForumCommentForm } from './WForumCommentForm'
import { IComment } from '../../types/forum.types'
import { apiGetCommentList } from '../../api/forum.api'

// design https://ant.design/components/list
export const WForumListComments = () => {
  const { id } = useParams()

  // ------- Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // ------
  const ButtonAdd = () => {
    return (
      <>
        <div className="button-add">
          <Button type="primary" onClick={showModal}>
            + Добавить комментарий
          </Button>
        </div>
      </>
    )
  }
  // ------- data
  const [dataCommentList, setDataCommentList] = useState<IComment[]>([])
  const {
    loading: loadingCommentList,
    response: apiCommentList,
    error: errorCommentList,
  } = apiGetCommentList() // API

  const getCommentList = useCallback(
    async (id: number) => {
      try {
        const data = await apiCommentList(id)
        if (data) setDataCommentList(data)
      } catch (e) {
        console.log(e)
      }
    },
    [apiCommentList]
  )
  // -------
  useEffect(() => {
    getCommentList(Number(id))
  }, [])
  return (
    <>
      <ButtonAdd />
      <Divider className="divider" orientation="left">
        Комментарии
      </Divider>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          align: 'center',
          onChange: page => {
            console.log(page)
          },
          pageSize: 6,
        }}
        dataSource={dataCommentList}
        footer={<ButtonAdd />}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <div
                style={{
                  color: item.self ? 'green' : 'inherit',
                  padding: '0 10px',
                }}>
                <UserOutlined rev={undefined} /> {item.login}
              </div>,
              <div>
                <LikeOutlined rev={undefined} /> {item.like}
              </div>,
            ]}>
            <Avatar src={item.avatar} />
            {item.content}
          </List.Item>
        )}
      />

      <Modal
        title="Добавление комментария"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}>
        <WForumCommentForm />
      </Modal>
    </>
  )
}
