import { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'

export const itemsMenu: MenuProps['items'] = [
  {
    label: (
      <NavLink to="/" rel="noopener noreferrer">
        LOGO
      </NavLink>
    ),
    key: 'main',
  },
]
