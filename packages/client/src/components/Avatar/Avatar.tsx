import React from 'react'
import styles from './styles.module.css'

interface AvatarProps {
  name?: string
  src?: string //Image URL
  width?: string
  alt?: string
}

export const Avatar: React.FC<AvatarProps> = ({ name, src, width, alt }) => {
  const isImageUrlNotAvailable = !src && name

  return (
    <>
      <div className={styles.container} style={{ width: width, height: width }}>
        {src && <img className={styles.avatarImage} alt={alt} src={src} />}
        {isImageUrlNotAvailable && (
          <div className={styles.text}>{name.substring(0, 2)}</div>
        )}
        <div className={styles.userpicHover} style={{ width: width }}>
          <label>
            Upload
            <input type="file" accept="image/png, image/jpeg" />
          </label>
        </div>
      </div>
    </>
  )
}
