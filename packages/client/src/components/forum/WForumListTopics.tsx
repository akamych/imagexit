import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Avatar, Button, Flex, List, Modal, Typography } from 'antd'
import { IItemTopic } from './forum.types'
import { WForumTopicForm } from './WForumTopicForm'
import { apiGetTopicList } from '../../api/forum.api'
import { alertStyle } from '../../assets/antdStyle'
import { MessageOutlined, EyeOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons'

// ------- TopicP review
const BoxTopicPreview = (props: IItemTopic) => {
  const { Title } = Typography
  return (
    <Flex vertical className="box-topic-preview">
      <Link to={props.item.url}>
        <Title level={5}>{props.item.title}</Title>
      </Link>
      <div className="box-content">{props.item.content}</div>
      <div>
        <Flex className="info-create">
          <div>
            Создан: <CalendarOutlined rev={undefined} />
            {props.item.created.date}
          </div>
          <div>
            <Avatar src={props.item.created.avatar} size={25} />
            <span className={props.item.created.self ? 'login active' : 'login'}>{props.item.created.login}</span>
          </div>
        </Flex>
      </div>
    </Flex>
  )
}

// ------- Last Comments
const BoxLastComments = (props: IItemTopic) => {
  return (
    <Flex vertical className="box-last-comment">
      <div className="title">Комментарии</div>
      <Flex>
        <div className={props.item.updated.self ? 'self' : ''}>
          <Avatar size={45} src={props.item.updated.avatar} />
        </div>
        <div>
          <div className="text">последний</div>
          <div className={props.item.updated.self ? 'login active' : 'login'}>{props.item.updated.login}</div>
          <div className="text">
            <ClockCircleOutlined rev={undefined} /> {props.item.updated.date}
          </div>
        </div>
      </Flex>
    </Flex>
  )
}

// -------  Topic Info Icon
const BoxTopicInfoIcon = (props: IItemTopic) => {
  return (
    <Flex vertical gap="middle" className="box-info-icon">
      <div>
        <MessageOutlined rev={undefined} /> {props.item.comments}
      </div>
      <div>
        <EyeOutlined rev={undefined} /> {props.item.views}
      </div>
    </Flex>
  )
}

// ================ ListTopics ================
// design https://ant.design/components/list

export const WForumListTopics = () => {
  const ModalFooter = useRef([])
  // ------- data
  const { loading, apiResList, apiDataList, apiStatus, apiMessage } = apiGetTopicList() // API

  const getList = useCallback(async () => {
    try {
      await apiResList()
    } catch (e: any) {
      console.error('apiGetTopicList', e)
    }
  }, [apiResList])
  // ------- Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const ButtonAdd = useMemo(() => {
    return (
      <div className="button-add">
        <Button type="primary" onClick={showModal}>
          + Добавить топик
        </Button>
      </div>
    )
  }, [])
  // --------

  useEffect(() => {
    getList()
  }, [])
  const BoxList = useMemo(() => {
    return (
      <List
        itemLayout="horizontal"
        size="large"
        className="forum-topic-list"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 6,
        }}
        dataSource={apiDataList}
        footer={ButtonAdd}
        renderItem={item => (
          <List.Item key={item.title} actions={[<BoxLastComments item={item} />]}>
            <BoxTopicInfoIcon item={item} />
            <BoxTopicPreview item={item} />
          </List.Item>
        )}
      />
    )
  }, [apiDataList])
  // --------
  return (
    <>
      {apiStatus == 'error' && <Alert message={apiMessage} type="error" style={alertStyle} />}
      {loading && <Alert message="Загрузка ... " type="info" style={alertStyle} />}
      {ButtonAdd}
      {BoxList}
      <Modal title="Добавление топика" open={isModalOpen} onCancel={handleCancel} footer={ModalFooter.current}>
        <WForumTopicForm />
      </Modal>
    </>
  )
}
