import React, { useRef } from 'react';
import * as styles from './index.css';
import CloseButtonIcon from '@/assets/CloseBtnIcon.svg?react';
import UploadIcon from '@/assets/upload.svg?react';

interface UploadImageProps {
  onImagesChange: (files: File[]) => void;
  uploadedImages: File[];
}

const UploadPhoto = ({ onImagesChange, uploadedImages }: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentFilesCount = uploadedImages.length;

    if (files.length > 0 && currentFilesCount + files.length <= 3) {
      onImagesChange([...uploadedImages, ...files]);
    } else if (currentFilesCount + files.length > 3) {
      alert('사진은 최대 3장까지 업로드할 수 있습니다.');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (uploadedImages.length < 3) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = uploadedImages.filter((_, index) => index !== indexToRemove);
    onImagesChange(updatedImages);
  };

  return (
    <div className={styles.container}>
      <button className={styles.upload_button} onClick={handleUploadClick}>
        <UploadIcon />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {uploadedImages.map((img, index) => (
        <div key={index} className={styles.preview_wrapper}>
          <img src={URL.createObjectURL(img)} alt={`업로드 ${index + 1}`} className={styles.previewImage} />
          <CloseButtonIcon onClick={() => handleRemoveImage(index)} />
        </div>
      ))}
    </div>
  );
};

export default UploadPhoto;
