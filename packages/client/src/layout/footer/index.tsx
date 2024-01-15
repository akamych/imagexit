import { Layout } from 'antd'

export function LFooter() {
  const { Footer } = Layout
  return (
    <>
      <Footer style={{ textAlign: 'center' }}>
        Copyright © {new Date().getFullYear()}
      </Footer>
    </>
  )
}
