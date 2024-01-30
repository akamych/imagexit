import { Layout } from 'antd'
import { usePagesRoutes } from '../router'
import { LFooter } from './footer'
import { LHeader } from './header'
import { contentStyle, layoutStyle } from '../assets/antdStyle'

export const Pages = () => {
  const { Content } = Layout
  const pages = usePagesRoutes()
  return (
    <>
      <Layout style={layoutStyle}>
        <LHeader />
        <Content style={contentStyle}>{pages}</Content>
        <LFooter />
      </Layout>
    </>
  )
}
