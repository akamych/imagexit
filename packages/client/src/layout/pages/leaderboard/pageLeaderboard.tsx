import './leaderboard.css'
import { Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'
import { WLeaderboardTOP10 } from '../../../components/leaderboard/WLeaderboardTOP10'

export const PageLeaderboard = () => {
  const { Title } = Typography

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'TOP 10',
      children: <WLeaderboardTOP10 />,
    },
  ]

  return (
    <>
      <div className="leaderboard">
        <Title>Рейтинг</Title>
        <Tabs defaultActiveKey="1" centered type="card" items={items} />
      </div>
    </>
  )
}
