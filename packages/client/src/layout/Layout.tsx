import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { usePagesRoutes } from '../router'
import { LFooter } from './footer'
import { LHeader } from './header'
import { contentStyle, layoutStyle } from '../assets/antdStyle'
import useAuth from '../hooks/useAuth'

export const Pages = () => {
  const [client, setClient] = useState(false)
  useAuth()
  const { Content } = Layout
  const pages = usePagesRoutes()
  useEffect(() => {
    setClient(true)
  }, [])
  return (
    <>
      {client && (
        <Layout style={layoutStyle}>
          <LHeader />
          <Content style={contentStyle}>{pages}</Content>
          <LFooter />
        </Layout>
      )}
    </>
  )
}
