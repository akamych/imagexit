import React from 'react'
import { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'
import { logoStyle } from '../assets/styles'

export const itemsMenu: MenuProps['items'] = [
  {
    label: (
      <NavLink to="/" rel="noopener noreferrer">
        <img style={logoStyle} src="/assets/images/mascot.png" />
      </NavLink>
    ),
    key: 'logo',
  },
  {
    label: (
      <NavLink to="/" rel="noopener noreferrer">
        Главная
      </NavLink>
    ),
    key: 'home',
  },
  {
    label: (
      <NavLink to="/forum" rel="noopener noreferrer">
        Форум
      </NavLink>
    ),
    key: 'forum',
  },
  {
    label: (
      <NavLink to="/leaderboard" rel="noopener noreferrer">
        Список лидеров
      </NavLink>
    ),
    key: 'leaderboard',
  },
  {
    label: (
      <NavLink to="/profile" rel="noopener noreferrer">
        Профиль
      </NavLink>
    ),
    key: 'profile',
  },
  {
    label: (
      <NavLink to="/play" rel="noopener noreferrer">
        Играть
      </NavLink>
    ),
    key: 'play',
  },
]
