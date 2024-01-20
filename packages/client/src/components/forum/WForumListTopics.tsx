import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Avatar, Button, Flex, List, Modal, Typography } from 'antd'
import { IItemTopic, IProps } from '../../types/forum.types'
import { WForumTopicForm } from './WForumTopicForm'
import { apiGetTopicList } from '../../api/forum.api'
import { alertStyle } from '../../assets/antdStyle'
import {
  MessageOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons'

// ------- TopicP review
const BoxTopicPreview = (props: IItemTopic) => {
  const { Title } = Typography
  return (
    <>
      <Flex vertical className="box-topic-preview">
        <Link to={props.item.url}>
          <Title level={5}>{props.item.title}</Title>
        </Link>
        <div className="content">{props.item.content}</div>
        <div>
          <Flex className="info-create">
            <div>
              Создан: <CalendarOutlined rev={undefined} />
              {props.item.created.date}
            </div>
            <div>
              <Avatar src={props.item.created.avatar} size={25} />
              <span
                className={props.item.created.self ? 'login self' : 'login'}>
                {props.item.created.login}
              </span>
            </div>
          </Flex>
        </div>
      </Flex>
    </>
  )
}

// ------- Last Comments
const BoxLastComments = (props: IItemTopic) => {
  return (
    <>
      <Flex vertical className="box-last-comment">
        <div className="title">Комментарии</div>
        <Flex>
          <div className={props.item.updated.self ? 'self' : ''}>
            <Avatar size={45} src={props.item.updated.avatar} />
          </div>
          <div>
            <div className="text">последний</div>
            <div className={props.item.updated.self ? 'login self' : 'login'}>
              {props.item.updated.login}
            </div>
            <div className="text">
              <ClockCircleOutlined rev={undefined} /> {props.item.updated.date}
            </div>
          </div>
        </Flex>
      </Flex>
    </>
  )
}

// -------  Topic Info Icon
const BoxTopicInfoIcon = (props: IItemTopic) => {
  return (
    <>
      <Flex vertical gap="middle" className="box-info-icon">
        <div>
          <MessageOutlined rev={undefined} /> {props.item.comments}
        </div>
        <div>
          <EyeOutlined rev={undefined} /> {props.item.views}
        </div>
      </Flex>
    </>
  )
}

// ================ ListTopics ================
// design https://ant.design/components/list

export const WForumListTopics = () => {
  const [dataList, setDataList] = useState<IProps[] | undefined>([])
  // ------- data
  const {
    loading: loadingList,
    response: apiList,
    error: errorList,
  } = apiGetTopicList() // API
  const getList = useCallback(async () => {
    try {
      const data = await apiList()
      setDataList(data)
    } catch (e) {
      console.log(e)
    }
  }, [apiList])

  // ------- Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const ButtonAdd = () => {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={showModal}>
            + Добавить топик
          </Button>
        </div>
      </>
    )
  }
  // --------
  useEffect(() => {
    getList()
  }, [])

  // --------
  return (
    <>
      {errorList && (
        <Alert message={errorList} type="error" style={alertStyle} />
      )}
      {loadingList && (
        <Alert message="Загрузка ... " type="info" style={alertStyle} />
      )}

      <ButtonAdd />

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
        dataSource={dataList}
        footer={<ButtonAdd />}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<BoxLastComments item={item} />]}>
            <BoxTopicInfoIcon item={item} />
            <BoxTopicPreview item={item} />
          </List.Item>
        )}
      />
      <Modal
        title="Добавление топика"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}>
        <WForumTopicForm />
      </Modal>
    </>
  )
}
