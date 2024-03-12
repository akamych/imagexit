import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import emojisData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useState, useCallback } from 'react'
import { emojiHolder, emojiPicker } from '../../assets/emojiStyle'
import { apiAddEmoji, apiGetEmoji } from '../../api/forum.api'
import { WForumTopicEmoji } from './WForumTopicEmoji'

export const WForumTopicEmojis = () => {
  const { id } = useParams()
  const [showPicker, setShowPicker] = useState(false)
  const [emojiList, setEmojiList] = useState<Record<string, number>>({})

  useEffect(() => {
    const getEmojis = async () => {
      if (!id || id === null) {
        return
      }
      const res = await apiGetEmoji(Number(id))
      if (res) {
        setEmojiList(res)
      }
    }
    getEmojis()
  }, [id])

  const handleEmojiClick = useCallback(
    async (emoji: string) => {
      if (!id || !emoji) {
        return
      }
      setShowPicker(false)

      const res = await apiAddEmoji({ id, emoji })
      if (res) {
        setEmojiList(res)
      }
    },
    [setShowPicker, apiAddEmoji]
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
