import './leaderboard.css'
import { Layout, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'
import { WLeaderboardTOP10 } from '../../../components/leaderboard/WLeaderboardTOP10'
import { WLeaderboardSelf } from '../../../components/leaderboard/WLeaderboardSelf'

export const PageLeaderboard = () => {
  const { Title } = Typography
  const { Content } = Layout

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'TOP 10',
      children: <WLeaderboardTOP10 />,
    },
    // {
    //   key: '2',
    //   label: 'Я в рейтинге',
    //   children: <WLeaderboardSelf />,
    // },
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
