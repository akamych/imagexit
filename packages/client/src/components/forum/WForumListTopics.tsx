import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Avatar, Button, Flex, List, Modal, Typography } from 'antd'
import { IItemTopic } from './forum.types'
import { WForumTopicForm } from './WForumTopicForm'
import { apiGetTopicList } from '../../api/forum.api'
import { alertStyle } from '../../assets/antdStyle'
import { MessageOutlined, EyeOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons'
import { selectUser } from '../../store/reducers/AuthReducer'
import { useSelector } from 'react-redux'
import { UserDetails } from '../../types/store'
import { DateFormatRU } from '../../helpers/dateFormat'

// ------- TopicP review
const BoxTopicPreview = (props: IItemTopic) => {
  const { Title } = Typography
  const self = false
  const avatar = props.item.created?.avatar ? props.item.created?.avatar : 'https://api.dicebear.com/7.x/miniavs/svg?seed=0'
  const login = props.item.created?.login ? props.item.created.login : 'Гость'
  return (
    <Flex vertical className="box-topic-preview">
      <Link to={'/forum/' + props.item.id}>
        <Title level={5}>{props.item.title}</Title>
      </Link>
      <div className="box-content">{props.item.description}</div>
      <div>
        <Flex className="info-create">
          <div>
            Создан: <CalendarOutlined rev={undefined} />
            {DateFormatRU(props.item.createdAt)}
          </div>
          <div>
            {<Avatar src={avatar} size={25} />}
            <span className={self ? 'login active' : 'login'}>{login}</span>
          </div>
        </Flex>
      </div>
    </Flex>
  )
}

// ------- Last Comments
const BoxLastComments = (props: IItemTopic) => {
  const self = false
  const avatar = props.item.updated?.avatar ? props.item.updated?.avatar : 'https://api.dicebear.com/7.x/miniavs/svg?seed=0'
  const login = props.item.updated?.login ? props.item.updated.login : 'Гость'
  return (
    <Flex vertical className="box-last-comment">
      {props.item.comments && (
        <>
          <div className="title">Комментарии</div>
          <Flex>
            <div className={self ? 'self' : ''}>
              <Avatar size={45} src={avatar} />
            </div>
            <div>
              <div className="text">последний</div>
              <div className={self ? 'login active' : 'login'}>{login}</div>
              <div className="text">
                <ClockCircleOutlined rev={undefined} /> {DateFormatRU(props.item.updatedAt)}
              </div>
            </div>
          </Flex>
        </>
      )}
    </Flex>
  )
}

// -------  Topic Info Icon
const BoxTopicInfoIcon = (props: IItemTopic) => {
  return (
    <Flex vertical gap="middle" className="box-info-icon">
      <div>
        <MessageOutlined rev={undefined} /> {props.item.comments ? props.item.comments : 0}
      </div>
      <div>
        <EyeOutlined rev={undefined} /> {props.item?.viewCount ? props.item?.viewCount : 0}
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
  const user = useSelector(selectUser) // store
  const getList = useCallback(
    async (user: UserDetails | null) => {
      try {
        await apiResList(user?.email)
      } catch (e: any) {
        console.error('apiGetTopicList', e)
      }
    },
    [apiResList, apiDataList]
  )
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
    getList(user)
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
      {/*<List>id={user?.id_local}</List>*/}
      {BoxList}
      <Modal title="Добавление топика" open={isModalOpen} onCancel={handleCancel} footer={ModalFooter.current}>
        <WForumTopicForm />
      </Modal>
    </>
  )
}
