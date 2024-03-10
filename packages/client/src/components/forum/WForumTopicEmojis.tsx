import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import emojisData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useMemo, useState } from 'react'
import { emojiElement, emojiElementClicks, emojiHolder, emojiPicker } from '../../assets/emojiStyle'
import { apiAddEmoji, apiGetEmoji } from '../../api/forum.api'

export const WForumTopicEmojis = () => {
  const { id } = useParams()
  const [showPicker, setShowPicker] = useState(false)
  const [emojiList, setEmojiList] = useState<Record<string, number>>({})

  // временное решение (пока без бека) - начало

  const getStorageName = useMemo<string>(() => `emojiTopic${id}`, [id])

  const getEmojisFromStorage = () => {
    const item = localStorage.getItem(getStorageName)
    return item ? JSON.parse(item) : {}
  }

  const setEmojiInStorage = (emoji: string) => {
    const current: Record<string, number> = getEmojisFromStorage()
    current[emoji] = current[emoji] ? current[emoji] + 1 : 1
    localStorage.setItem(getStorageName, JSON.stringify(current))
    setEmojiList(current)
  }

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
      const current: Record<string, number> = getEmojisFromStorage()
      setEmojiList(current)
    }
    getEmojis()
  }, [id])

  const renderEmoji = (code: string, likes: number): React.ReactNode => {
    // для составных эмоджи из нескольких символов
    const codes: string[] = code.indexOf('-') > -1 ? code.split('-') : [code]
    return (
      <div className="emoji" onClick={() => handleEmojiClick(code)} style={emojiElement}>
        <span>{codes.map(code => String.fromCodePoint(Number(`0x${code}`)))}</span>
        <span style={emojiElementClicks}>{likes}</span>
      </div>
    )
  }

  const handleEmojiClick = async (emoji: string) => {
    if (!id || !emoji) {
      return
    }
    setShowPicker(false)

    // const res = await apiAddEmoji({ id, emoji })
    // if (res) {
    //   setEmojiList(res);
    // }
    setEmojiInStorage(emoji)
  }

  const handleEmojiPickerClick = (emojiData: Record<string, string>) => {
    const { unified } = emojiData
    handleEmojiClick(unified)
  }

  return (
    <>
      <div className="emojis" style={emojiHolder}>
        {Object.entries(emojiList).map(([code, clicks]) => renderEmoji(code, clicks))}
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
