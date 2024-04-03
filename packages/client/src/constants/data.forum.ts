import { IComment, IProps } from '../components/forum/forum.types'
import { isDevelopment } from '../utils/EnvUtil'

export const apiBaseUrl = isDevelopment ? `http://localhost:${__SERVER_PORT__}` : 'https://imagexit-web-client.vercel.app' // https://imagexit-web-client.vercel.app `http://localhost:${__SERVER_PORT__}`

export const IPropsDefault = {
  id: 0,
  title: '',
  description: '',
  comments: 0,
  viewCount: 0,
  createdAt: '',
  updatedAt: '',
  created: {
    id: 0,
    login: `0`,
    avatar: ``,
  },
  updated: {
    id: 0,
    login: '',
    avatar: '',
  },
}

export const dataTestForumTopicList: IProps[] = Array.from({
  length: 43,
}).map((_, i) => ({
  id: i,
  title: `Topic #${i} название может быть длиннее`,
  description: `Привет, искатели приключений в мире Имджинариум!
      Сегодня хочу поделиться впечатлениями и обсудить тот удивительный мир, который мы все вместе создаем в нашей любимой игре. 
      Имджинариум - это не просто игра, это погружение в уникальный виртуальный мир, где каждый игрок является архитектором своей истории.`,
  comments: i + 12,
  viewCount: i * 3 + 1024,
  createdAt: '20.12.2023',
  updatedAt: '20.12.2023',
  created: {
    id: 1,
    login: `loginAuthor${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  },
  updated: {
    id: 1,
    login: `loginAuthor${i + 3}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i + 3}`,
  },
}))

export function dataTestForumTopicId(i: number): IProps {
  return {
    id: i,
    title: `Topic #${i} название может быть длиннее`,
    description: ` Привет, искатели приключений в мире Имджинариум! Сегодня хочу поделиться впечатлениями и обсудить тот удивительный мир, который мы все вместе создаем в нашей любимой игре. Имджинариум - это не просто игра, это погружение в уникальный виртуальный мир, где каждый игрок является архитектором своей истории.
    Какие моменты в Имджинариуме оставили наилучшее впечатление? Может быть, это встреча с загадочными существами в лесу Тенистых Веков или захватывающий квест в Городе Забытых Снов? Расскажите о своих приключениях и поделитесь стратегиями, которые помогли вам преодолеть трудности и достичь новых высот.
  Как вы используете карму и магию в игре? Есть ли у вас любимые предметы или заклинания? Давайте обменяемся секретами и лучшими практиками для успешного прохождения заданий.
  Также, хочется услышать ваше мнение о геймплейных обновлениях и будущих планах для Имджинариума. Какие функции вы надеетесь увидеть в следующих обновлениях?
  Не забудьте поделиться своими креативными идеями для развития вашего персонажа и создания уникальной истории в этом захватывающем мире воображения.
   Давайте сделаем этот топик местом, где мы можем вместе разделять наши впечатления, вдохновлять друг друга и создавать великие виртуальные приключения в Имджинариуме! 🌟🎭
`,
    comments: i + 12,
    viewCount: i * 3 + 1024,
    createdAt: '20.12.2023',
    updatedAt: '20.12.2023',
    created: {
      id: 1,
      login: `loginAuthor${i}`,
      avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    },
    updated: {
      id: 1,
      login: `loginAuthor${i + 3}`,
      avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i + 3}`,
    },
  }
}

export function dataTestForumCommentList(topicId: number): IComment[] {
  return Array.from({ length: 43 + topicId }).map((_, i) => ({
    id: i,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    login: `login${i}`,
    content: `Читаю ваши рассказы и просто вижу, как этот мир кишит удивительными моментами! Однажды в Заоблачных Королевствах, в самом центре Мистического Фонтана, я столкнулся с древним духом мудрости. Он предложил мне испытание знаний, и если бы не моя заточенная в максимум интеллектуальная способность, 
      я бы не справился. Этот опыт укрепил мою веру в то, что в Имджинариуме каждый уголок приносит неожиданные открытия!`,
    like: i + 3,
    createdAt: '20.12.2023',
    updatedAt: '20.12.2023',
  }))
}
