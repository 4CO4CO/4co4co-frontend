import React, { useRef, useState } from 'react';
import * as styles from './index.css';
import UploadIcon from '@/assets/upload.svg?react';

interface UploadedImage {
  src: string;
  description: string;
}

const UploadPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && images.length < 3) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, { src: reader.result as string, description: '' }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index].description = value;
    setImages(newImages);
  };

  const handleUploadClick = () => {
    if (images.length < 3) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.upload_button} onClick={handleUploadClick}>
        <UploadIcon />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.src} alt={`업로드 ${index + 1}`} className={styles.previewImage} />
          <textarea
            className={styles.textarea}
            placeholder="이 사진에 담긴 기억하고 싶은 순간을 설명해주세요."
            value={img.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default UploadPhoto;
