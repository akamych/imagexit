import React from 'react'

export const emojiMoreGrid: React.CSSProperties = {
  display: 'grid',
  alignItems: 'start',
  gridTemplateColumns: '1fr max-content',
}

export const moreButton: React.CSSProperties = {
  justifySelf: 'end',
}

export const emojiHolder: React.CSSProperties = {
  overflow: 'visible',
  position: 'relative',
}

export const emojiPicker: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: '0',
  zIndex: '10',
}

export const emojiElement: React.CSSProperties = {
  display: 'inline-grid',
  gridTemplateColumns: 'max-content max-content',
  alignItems: 'center',
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: '2em',
  marginRight: '0.5em',
  marginBottom: '0.5em',
  padding: '0.25em',
  fontSize: '24px',
  lineHeight: '24px',
  cursor: 'pointer',
}

export const emojiElementClicks: React.CSSProperties = {
  display: 'inline-block',
  margin: '0 0.25em',
  fontSize: '16px',
  color: 'black',
}
