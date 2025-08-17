import React, { useRef, useState } from 'react';
import ImageEditor from './editor';
import * as styles from './index.css';
import CloseButtonIcon from '@/assets/CloseBtnIcon.svg?react';
import UploadIcon from '@/assets/upload.svg?react';
import { Toast } from '@/components/common/toast';
import { extractImageMetadata, formatDateToDate } from '@/utils/extractImageDate';

interface UploadImageProps {
  onImagesChange: (files: File[]) => void;
  uploadedImages: File[];
  onDateExtracted?: (date: string | null) => void;
}

const UploadPhoto = ({ onImagesChange, uploadedImages, onDateExtracted }: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [originalFiles, setOriginalFiles] = useState<File[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentFilesCount = uploadedImages.length;

    if (files.length > 0 && currentFilesCount + files.length <= 3) {
      const newFiles = [...files];
      const newIndex = uploadedImages.length;
      onImagesChange([...uploadedImages, ...files]);
      setOriginalFiles([...originalFiles, ...newFiles]);
      setEditingImageIndex(newIndex);
      setIsEditorOpen(true);

      // 이미지 메타데이터 추출
      const metadataPromises = newFiles.map((file) => extractImageMetadata(file));
      const allMetadata = await Promise.all(metadataPromises);

      let extractedDate: string | null = null;

      allMetadata.forEach((metadata, index) => {
        const file = newFiles[index];
        const formattedDate = formatDateToDate(metadata, file);

        if (!extractedDate && formattedDate) {
          extractedDate = formattedDate;
        }
      });

      if (onDateExtracted) {
        onDateExtracted(extractedDate);
      }

    } else if (currentFilesCount + files.length > 3) {
      setToast({ message: '사진은 최대 3장까지 업로드할 수 있습니다.', type: 'error' });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (uploadedImages.length < 3) {
      fileInputRef.current?.click();
    } else {
      setToast({ message: '사진은 최대 3장까지 업로드할 수 있습니다.', type: 'error' });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = uploadedImages.filter((_, index) => index !== indexToRemove);
    const updatedOriginalFiles = originalFiles.filter((_, index) => index !== indexToRemove);
    onImagesChange(updatedImages);
    setOriginalFiles(updatedOriginalFiles);
  };

  const handleOpenEditor = (index: number) => {
    setEditingImageIndex(index);
    setIsEditorOpen(true);
  };

  const handleCroppedImage = (croppedImageUrl: string) => {
    if (editingImageIndex !== null) {
      fetch(croppedImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const croppedFile = new File([blob], `cropped_image_${editingImageIndex}.jpeg`, { type: 'image/jpeg' });
          const updatedImages = [...uploadedImages];
          updatedImages[editingImageIndex] = croppedFile;
          onImagesChange(updatedImages);
        });
    }
    setIsEditorOpen(false);
    setEditingImageIndex(null);
  };

  const handleEditorClose = (index: number) => {
    setIsEditorOpen(false);
    setEditingImageIndex(null);
    handleRemoveImage(index);
  };

  return (
    <div className={styles.container}>
      <button className={styles.upload_button} onClick={handleUploadClick}>
        <UploadIcon />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      {uploadedImages.map((img, index) => (
        <div key={index} className={styles.preview_wrapper} onClick={() => handleOpenEditor(index)}>
          <img src={URL.createObjectURL(img)} alt={`업로드 ${index + 1}`} className={styles.previewImage} />
          <CloseButtonIcon
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage(index);
            }}
          />
        </div>
      ))}
      {isEditorOpen && editingImageIndex !== null && (
        <ImageEditor
          file={URL.createObjectURL(originalFiles[editingImageIndex])}
          aspectRatio={10 / 9}
          onCropped={handleCroppedImage}
          onClose={() => handleEditorClose(editingImageIndex)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default UploadPhoto;
