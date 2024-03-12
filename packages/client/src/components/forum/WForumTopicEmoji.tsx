import { useMemo } from 'react'
import { emojiElement, emojiElementClicks } from '../../assets/emojiStyle'

type WForumTopicEmojiProps = {
  code: string
  clicks: number
  handleEmojiClick: (x: string) => void
}

export const WForumTopicEmoji = (props: WForumTopicEmojiProps) => {
  const { code, clicks, handleEmojiClick } = props

  const codes: string[] = useMemo(() => (code.indexOf('-') > -1 ? code.split('-') : [code]), [code])

  return (
    <div key={`emoji${code}`} className="emoji" onClick={() => handleEmojiClick(code)} style={emojiElement}>
      <span>{codes.map(code => String.fromCodePoint(Number(`0x${code}`)))}</span>
      <span style={emojiElementClicks}>{clicks}</span>
    </div>
  )
}
