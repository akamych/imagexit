import { useState } from 'react'
import { Alert, Button, Checkbox, Divider, Form, Input, Select, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { playerColors } from '../../constants/game'
import { IPlayerInfo } from '../../types/game'
import { randomInteger } from '../../helpers/number'

type IWgameStepStart = {
  сloseModal: () => void
  startSettingsSave: (team: IPlayerInfo[], difficulty: string) => void
}

export const WgameStepStart = (props: IWgameStepStart) => {
  const { Title, Text } = Typography

  const demoplayer = [
    { value: 'key1', label: 'Ava Swift' },
    { value: 'key2', label: 'Cole Reed' },
    { value: 'key3', label: 'Mia Blake' },
    { value: 'Bot1', label: 'Bot1' },
    { value: 'Bot2', label: 'Bot2' },
    { value: 'Bot3', label: 'Bot3' },
    { value: 'Bot4', label: 'Bot4' },
    { value: 'Bot5', label: 'Bot5' },
    { value: 'Bot6', label: 'Bot6' },
    { value: 'Bot7', label: 'Bot7' },
  ]
  const demoDifficulty = [
    { value: 'light', label: 'легкая' },
    { value: 'normal', label: 'нормальная' },
    { value: 'hard', label: 'сложная' },
  ]
  const [players, setplayers] = useState(demoplayer)
  const [difficulty, setDifficulty] = useState(demoDifficulty)

  const [form] = Form.useForm()
  // ----------------------
  const onFinish = (values: any) => {
    props.сloseModal()
    console.log('Send form: ', values)
    const teamInput: IPlayerInfo[] = []
    teamInput.push({ userId: 'self', login: 'self', color: playerColors[6], score: 0, selectedImageIndex: randomInteger(0, 5), scoreAdd: 0 })
    values.players.forEach((item: string, index: any) => {
      teamInput.push({ userId: item, login: item, color: playerColors[index], score: 0, selectedImageIndex: randomInteger(0, 5), scoreAdd: 0 })
    })
    props.startSettingsSave(teamInput, values.difficulty)
  }
  /*
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
*/
  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }
  // ==================
  const max_count = 6
  const [value, setValue] = useState<string[]>([])

  const suffix = (
    <>
      <span>
        {value.length} / {max_count}
      </span>
      <DownOutlined rev={undefined} />
    </>
  )
  // ==============

  //=================
  return (
    <>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish} autoComplete="off">
        <Title level={2}>Новая игра</Title>
        <Divider plain className="mt-divider">
          Сложность игры
        </Divider>

        <Form.Item label="Сложность" name="difficulty" rules={[{ required: true, message: 'Выберите сложность' }]}>
          <Select placeholder="Выберите " options={difficulty} />
        </Form.Item>
        <Divider plain className="mt-divider">
          Команда
        </Divider>
        <div className="mb-row">
          <Text disabled>Выберите команду от 2 до 6 игроков. В списке доступны боты</Text>
        </div>
        <Form.Item
          label="Игроки"
          name="players"
          rules={[
            {
              required: true,
              message: 'Выберите игроков для команды от 2 до 6',
            },
          ]}>
          <Select mode="multiple" maxCount={max_count} value={value} onChange={setValue} suffixIcon={suffix} placeholder="Выберите игроков или ботов" options={players} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
