export interface IEventProps {
  id: number
  login: string
  avatar: string
}

export interface IProps {
  id: number
  title: string
  description: string
  comments: number
  viewCount: number
  createdAt: string
  updatedAt: string
  created: IEventProps
  updated: IEventProps
}

export interface IItemTopic {
  item: IProps
}

export interface IComment {
  id: number
  avatar: string
  login: string
  content: string
  like: number
  createdAt: string
  updatedAt: string
}
