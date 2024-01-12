import { Layout } from 'antd'
import { usePagesRoutes } from '../router'
import { LFooter } from './footer'
import { LHeader } from './header'
import { Content } from 'antd/es/layout/layout'
import { contentStyle } from '../assets/antdStyle'

export const Pages = () => {
  const pages = usePagesRoutes()
  return (
    <>
      <Layout>
        <LHeader />
        <Content style={contentStyle}>{pages}</Content>
        <LFooter />
      </Layout>
    </>
  )
}
