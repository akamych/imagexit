export interface IEventProps {
  date: string
  login: string
  avatar: string
  self: boolean
}

export interface IProps {
  id: number
  url: string
  title: string
  content: string
  comments: number
  views: number
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
  self: boolean
}
