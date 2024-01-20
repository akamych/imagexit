import { Alert, Button, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProps } from '../../types/forum.types'
import { IPropsDefault } from '../../constants/data.forum'
import { apiGetTopicContent } from '../../api/forum.api'
import { alertStyle } from '../../assets/antdStyle'

export const WForumTopicContent = () => {
  const { Paragraph, Title } = Typography
  const { id } = useParams()
  // -----
  const [ellipsis, setEllipsis] = useState(true)
  const [dataTopic, setDataTopic] = useState<IProps>(IPropsDefault)

  // ------- data
  const {
    loading: loadingContent,
    response: apiContent,
    error: errorContent,
  } = apiGetTopicContent() // API

  const getContent = useCallback(
    async (id: number) => {
      try {
        const data = await apiContent(id)
        if (data) setDataTopic(data)
      } catch (e) {
        console.log(e)
      }
    },
    [apiContent]
  )
  // --------- Save
  const saveTitle = useCallback(
    async (title: string) => {
      try {
        //const res = await apiSaveTitle(title)
        setDataTopic({ ...dataTopic, title: title })
      } catch (e) {
        console.log(e)
      }
    },
    [apiContent]
  )
  const saveContent = useCallback(
    async (content: string) => {
      try {
        //const res = await apiSaveTitle(title)
        setDataTopic({ ...dataTopic, content: content })
      } catch (e) {
        console.log(e)
      }
    },
    [apiContent]
  )

  // --------
  useEffect(() => {
    getContent(Number(id))
  }, [])
  return (
    <>
      {loadingContent && (
        <Alert message="Загрузка" type="info" style={alertStyle} />
      )}
      {errorContent && (
        <Alert message={errorContent} type="error" style={alertStyle} />
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
