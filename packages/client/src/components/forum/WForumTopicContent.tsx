import { Alert, Button, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProps } from './forum.types'
import { IPropsDefault } from '../../constants/data.forum'
import { apiGetTopicContent } from '../../api/forum.api'
import { alertStyle } from '../../assets/antdStyle'

export const WForumTopicContent = () => {
  const { Paragraph, Title } = Typography
  const { id } = useParams()
  // -----
  const [ellipsis, setEllipsis] = useState(true)
  const [dataTopic, setDataTopic] = useState<IProps>(IPropsDefault) // !!! Удалить Переменную после реализации сохрания изменений через API
  const [status, setStatus] = useState('') // ok|error|
  const [message, setMessage] = useState('')
  // ------- data
  const { loading, apiResTopic, apiDataTopic, apiStatus, apiMessage } =
    apiGetTopicContent() // API
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
  const saveContent = useCallback(async (content: string) => {
    try {
      //const res = await apiSaveTitle(title)
      setDataTopic({ ...dataTopic, content: content })
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
      {status == 'error' && (
        <Alert message={message} type="error" style={alertStyle} />
      )}
      {dataTopic.created.self && (
        <>
          <Title editable={{ onChange: saveTitle }}>{dataTopic.title}</Title>
          <Paragraph
            editable={{ onChange: saveContent }}
            ellipsis={
              ellipsis ? { rows: 2, expandable: true, symbol: ' ' } : false
            }>
            {dataTopic.content}
          </Paragraph>
        </>
      )}
      {!dataTopic.created.self && (
        <>
          <Title>{dataTopic.title}</Title>
          <Paragraph
            ellipsis={
              ellipsis ? { rows: 2, expandable: true, symbol: ' ' } : false
            }>
            {dataTopic.content}
          </Paragraph>
        </>
      )}
      <div className="button-more">
        <Button type="dashed" onClick={() => setEllipsis(!ellipsis)}>
          {ellipsis ? 'еще' : 'свернуть'}
        </Button>
      </div>
    </>
  )
}
