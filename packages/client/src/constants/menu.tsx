import { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'

export const itemsMenu: MenuProps['items'] = [
  {
    label: (
      <NavLink to="/" rel="noopener noreferrer">
        Imaginarium
      </NavLink>
    ),
    key: 'logo',
  },
  {
    label: (
      <NavLink to="/" rel="noopener noreferrer">
        Home
      </NavLink>
    ),
    key: 'home',
  },
  {
    label: (
      <NavLink to="/forum" rel="noopener noreferrer">
        Forum
      </NavLink>
    ),
    key: 'forum',
  },
  {
    label: (
      <NavLink to="/leaderboard" rel="noopener noreferrer">
        Leaderboard
      </NavLink>
    ),
    key: 'leaderboard',
  },
  {
    label: (
      <NavLink to="/profile" rel="noopener noreferrer">
        Profile
      </NavLink>
    ),
    key: 'profile',
  },
  {
    label: (
      <NavLink to="/play" rel="noopener noreferrer">
        Play
      </NavLink>
    ),
    key: 'play',
  },
]
