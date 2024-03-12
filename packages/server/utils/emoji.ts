import ForumTopicEmojis from '../sequelize/models/forumTopicEmojis.model'

export const emojiResponseMapper = (emojis: ForumTopicEmojis[]): Record<string, string | number> => {
  const mappedValues: Record<string, string | number> = {}
  emojis.forEach(emoji => {
    mappedValues[emoji.code] = emoji.clicks
  })
  return mappedValues
}
