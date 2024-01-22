import { Layout, Menu, MenuProps } from 'antd'
import { itemsMenu } from '../../constants/menu'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'

export function LHeader() {
  const { Header } = Layout
  const [current, setCurrent] = useState('main')

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink to="/" rel="noopener noreferrer">
          <div className={styles.logo} onClick={() => setCurrent('home')} />
        </NavLink>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onClick}
          selectedKeys={[current]}
          defaultSelectedKeys={['2']}
          items={itemsMenu}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
    </>
  )
}
