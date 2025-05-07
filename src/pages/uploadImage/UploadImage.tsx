import React, { useState } from 'react';
import * as styles from './UploadImage.css';

const UploadImage = () => {
  const [image, setImage] = useState<File>();
  const [description, setDescription] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return; // file 없으면 early return
    setImage(file[0]);
  };

  const handleSubmitImage = async () => {
    const URL = import.meta.env.VITE_API_BASE_URL + '/api/v1/users/';
    const formData = new FormData();
    formData.append('name', description);
    if (image) {
      formData.append('image', image);
    }
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('[user_key]', result.data.user_key);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.image_container}>
        {!image ? (
          <div className={styles.button_container}>
            이미지 업로드하기
            <input
              className={styles.file_input}
              type="file"
              accept=".png, .jpeg, .jpg, .webp, .heic, .heif"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <img className={styles.image} src={URL.createObjectURL(image)} alt="추억 이미지" />
        )}
      </div>
      <input
        className={styles.text_input}
        type="text"
        placeholder="이미지에 대해 설명해주세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" onClick={handleSubmitImage}>
        제출하기
      </button>
    </>
  );
};

export default UploadImage;
