import { useParams } from 'react-router-dom'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Avatar, Button, Divider, List, Modal } from 'antd'
import { LikeOutlined, UserOutlined } from '@ant-design/icons'
import { WForumCommentForm } from './WForumCommentForm'
import { apiGetCommentList } from '../../api/forum.api'
import { alertStyle } from '../../assets/antdStyle'

// design https://ant.design/components/list
export const WForumListComments = () => {
  const { id } = useParams()
  const ModalFooter = useRef([])

  // ------- Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  // ------
  const ButtonAdd = useMemo(() => {
    return (
      <div className="button-add">
        <Button type="primary" onClick={showModal}>
          + Добавить комментарий
        </Button>
      </div>
    )
  }, [])

  // ------- data
  const { loading, apiResList, apiDataList, apiStatus, apiMessage } = apiGetCommentList() // API
  const getList = useCallback(
    async (id: number) => {
      try {
        await apiResList(id)
      } catch (e: any) {
        console.error('apiGetCommentList', e)
      }
    },
    [apiResList]
  )
  // -------

  useEffect(() => {
    getList(Number(id))
  }, [])
  // ----
  const BoxList = useMemo(() => {
    return (
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
        dataSource={apiDataList}
        footer={ButtonAdd}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <div className={item.self ? 'login active' : 'login'}>
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
    )
  }, [apiDataList])

  return (
    <>
      {ButtonAdd}

      <Divider className="divider" orientation="left">
        Комментарии
      </Divider>
      {apiStatus == 'error' && <Alert message={apiMessage} type="error" style={alertStyle} />}
      {loading && <Alert message="Загрузка ... " type="info" style={alertStyle} />}
      {BoxList}
      <Modal title="Добавление комментария" open={isModalOpen} onCancel={handleCancel} footer={ModalFooter.current}>
        <WForumCommentForm />
      </Modal>
    </>
  )
}
