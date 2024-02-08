import React, { useState } from 'react'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../store/actions/AvatarActions'

interface AvatarProps {
  name?: string
  src?: string // Image URL
  width?: string
  alt?: string
}

const API_URL = 'https://ya-praktikum.tech/api/v2/user'

export const Avatar: React.FC<AvatarProps> = ({ name, src, width, alt }) => {
  const dispatch = useDispatch()

  const isImageUrlNotAvailable = !src && name

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const response = await fetch(`${API_URL}/profile/avatar`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
      if (response.ok) {
        // Extract the new avatar URL from the response
        const user = await response.json()
        console.log('Response:', user)

        // Dispatch an action to update the user data in the Redux store
        dispatch(updateUser(user))
      } else {
        console.error('Failed to upload avatar')
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  return (
    <>
      <div className={styles.container} style={{ width: width, height: width }}>
        {src && <img className={styles.avatarImage} alt={alt} src={src} />}
        {isImageUrlNotAvailable && <div className={styles.text}>{name?.substring(0, 2)}</div>}
        <div className={styles.userpicHover} style={{ width: width }}>
          <label>
            Upload
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileUpload} />
          </label>
        </div>
      </div>
    </>
  )
}
