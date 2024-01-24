import { Avatar, Col, Row, Table } from 'antd'
import { ILeaderboardTable } from '../../types/leaderboard.types'

export const WLeaderboardTable = (props: ILeaderboardTable) => {
  const columns = [
    {
      title: 'position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar size={40} src={`${avatar}`} />,
    },
    {
      title: 'login',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'points',
      dataIndex: 'points',
      key: 'points',
    },
  ]

  return (
    <>
      <Row>
        <Col span={10} offset={7}>
          <Table
            dataSource={props.users}
            columns={columns}
            pagination={false}
            onRow={record => ({
              style: {
                background: record.id == props.selectId ? '#f6ffed' : 'default',
              },
            })}
          />
        </Col>
      </Row>
    </>
  )
}
