import { Alert, Button, Space, Typography, Divider } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProps } from './forum.types'
import { IPropsDefault } from '../../constants/data.forum'
import { apiGetTopicContent } from '../../api/forum.api'
import { alertStyle } from '../../assets/antdStyle'
import { WForumTopicEmojis } from './WForumTopicEmojis'
import { emojiMoreGrid, moreButton } from '../../assets/emojiStyle'
import { DateFormatRU } from '../../helpers/dateFormat'
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons'

export const WForumTopicContent = () => {
  const { Paragraph, Title, Text } = Typography
  const { id } = useParams()
  const self = false
  // -----
  const [ellipsis, setEllipsis] = useState(true)
  const [dataTopic, setDataTopic] = useState<IProps>(IPropsDefault) // !!! Удалить Переменную после реализации сохрания изменений через API
  const [status, setStatus] = useState('') // ok|error|
  const [message, setMessage] = useState('')
  // ------- data
  const { loading, apiResTopic, apiDataTopic, apiStatus, apiMessage } = apiGetTopicContent() // API
  const getContent = useCallback(
    async (id: number) => {
      try {
        await apiResTopic(id)
      } catch (e: any) {
        console.error(e)
      }
    },
    [apiResTopic]
  )
  // --------- Save
  const saveTitle = useCallback(async (title: string) => {
    try {
      //const res = await apiSaveTitle(title)
      setDataTopic({ ...dataTopic, title: title })
    } catch (e) {
      console.log(e)
    }
  }, [])
  const saveContent = useCallback(async (description: string) => {
    try {
      //const res = await apiSaveTitle(title)
      setDataTopic({ ...dataTopic, description: description })
    } catch (e) {
      console.log(e)
    }
  }, [])

  // --------
  useEffect(() => {
    getContent(Number(id))
  }, [])

  useEffect(() => {
    // !!! Удалить useEffect после реализации сохрания изменений через API
    setDataTopic(apiDataTopic)
    setStatus(apiStatus)
    setMessage(apiMessage)
  }, [apiDataTopic, apiStatus, apiMessage])

  return (
    <>
      {loading && <Alert message="Загрузка" type="info" style={alertStyle} />}
      {status == 'error' && <Alert message={message} type="error" style={alertStyle} />}

      {self && <Title editable={{ onChange: saveTitle }}>{dataTopic.title} </Title>}
      {!self && <Title>{dataTopic.title}</Title>}
      <Space>
        <Text type="secondary">
          Создан: <CalendarOutlined rev={undefined} /> {DateFormatRU(dataTopic.createdAt)}
        </Text>
        <Divider type="vertical" />
        <Text type="secondary">
          Изменен: <ClockCircleOutlined rev={undefined} /> {DateFormatRU(dataTopic.updatedAt)}
        </Text>
        <Divider type="vertical" />
      </Space>
      <Divider dashed />
      {self && (
        <Paragraph editable={{ onChange: saveContent }} ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: ' ' } : false}>
          {dataTopic.description}
        </Paragraph>
      )}
      {!self && <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: ' ' } : false}>{dataTopic.description}</Paragraph>}

      <div className="forum-emojis" style={emojiMoreGrid}>
        <WForumTopicEmojis />
        <div className="button-more" style={moreButton}>
          <Button type="dashed" onClick={() => setEllipsis(!ellipsis)}>
            {ellipsis ? 'еще' : 'свернуть'}
          </Button>
        </div>
      </div>
    </>
  )
}
