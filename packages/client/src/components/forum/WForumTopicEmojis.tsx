import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import emojisData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { emojiHolder, emojiPicker } from '../../assets/emojiStyle'
import { apiAddEmoji, apiGetEmoji } from '../../api/forum.api'
import { WForumTopicEmoji } from './WForumTopicEmoji'

const getEmojisFromStorage = (storageName: string) => {
  const item = localStorage.getItem(storageName)
  return item ? JSON.parse(item) : {}
}

export const WForumTopicEmojis = () => {
  const { id } = useParams()
  const [showPicker, setShowPicker] = useState(false)
  const [emojiList, setEmojiList] = useState<Record<string, number>>({})

  // временное решение (пока без бека) - начало

  const storageName = useMemo<string>(() => `emojiTopic${id}`, [id])

  const setEmojiInStorage = useCallback(
    (emoji: string) => {
      const current: Record<string, number> = getEmojisFromStorage(storageName)
      current[emoji] = (current[emoji] ?? 0) + 1
      localStorage.setItem(storageName, JSON.stringify(current))
      setEmojiList(current)
    },
    [getEmojisFromStorage, storageName]
  )

  // временное решение (пока без бека) - конец

  useEffect(() => {
    const getEmojis = async () => {
      if (!id) {
        return
      }
      // const res = await apiGetEmoji(id)
      // if (res) {
      //   setEmojiList(res);
      // }
      const current: Record<string, number> = getEmojisFromStorage(storageName)
      setEmojiList(current)
    }
    getEmojis()
  }, [id])

  const handleEmojiClick = useCallback(
    async (emoji: string) => {
      if (!id || !emoji) {
        return
      }
      setShowPicker(false)

      // const res = await apiAddEmoji({ id, emoji })
      // if (res) {
      //   setEmojiList(res);
      // }
      setEmojiInStorage(emoji)
    },
    [setShowPicker, setEmojiInStorage]
  )

  const handleEmojiPickerClick = useCallback(
    (emojiData: Record<string, string>) => {
      const { unified } = emojiData
      handleEmojiClick(unified)
    },
    [handleEmojiClick]
  )

  return (
    <>
      <div className="emojis" style={emojiHolder}>
        {Object.entries(emojiList).map(([code, clicks]) => (
          <WForumTopicEmoji key={`emoji${code}`} code={code} clicks={clicks} handleEmojiClick={handleEmojiClick} />
        ))}
        <div className="button">
          <Button type="dashed" onClick={() => setShowPicker(!showPicker)}>
            Добавить реакцию
          </Button>
        </div>
        {showPicker && (
          <div className="emojiPicker" style={emojiPicker}>
            <Picker data={emojisData} onEmojiSelect={handleEmojiPickerClick} />
          </div>
        )}
      </div>
    </>
  )
}
