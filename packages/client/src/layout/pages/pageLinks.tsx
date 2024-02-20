import React from 'react'

import { Typography, theme } from 'antd'
import { NavLink } from 'react-router-dom'

export function PageLinks() {
  const { Title } = Typography
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <>
      <div
        style={{
          textAlign: 'start',
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}>
        <Title level={2}>Ссылки</Title>

        <ul>
          <li>
            <NavLink to="/" title="Home page">
              Главная страница
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" title="Login page">
              Страница логина
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" title="Sign up page">
              Страница регистрации
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" title="Profile page">
              Cтраница профиля
            </NavLink>
          </li>
          <li>
            <NavLink to="/play" title="Game page">
              Cтраница игры
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" title="Leaderboard page">
              Страница лидерборда
            </NavLink>
          </li>
          <li>
            <NavLink to="/forum" title="Forum page">
              Cтраница форума
            </NavLink>
          </li>
          <li>
            <NavLink to="/forum/1" title="Forum page Topic 1">
              Cтраница топика форума #1
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}
