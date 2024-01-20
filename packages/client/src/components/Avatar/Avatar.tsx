import React from 'react';
import styles from './styles.module.css';

interface AvatarProps {
  name?: string;
  imageUrl?: string;
  width?: string
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, width }) => {
  const isImageUrlNotAvailable = !imageUrl && name;

  return (
    <>
      <div className={styles.container}>
        <p>Upload</p>
        {imageUrl && <img className={styles.avatarImage} width={width} alt="avatar" src={imageUrl} />}
        {isImageUrlNotAvailable && <div className={styles.avatarText}>{name.substring(0, 2)}</div>}
      </div>
    </>
  );
};

export default Avatar;
