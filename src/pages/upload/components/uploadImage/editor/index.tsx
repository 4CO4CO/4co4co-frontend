import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import * as styles from './index.css';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@/components/common/button';
import { useCropImage } from '@/pages/upload/hooks/useCropImage';

interface ImageEditorProps {
  file: string;
  aspectRatio: number;
  onCropped: (croppedImageUrl: string) => void;
  onClose: () => void;
}

const ImageEditor = ({ file, aspectRatio = 10 / 9, onCropped, onClose }: ImageEditorProps) => {
  const [crop, setCrop] = useState<Crop>(); // 크롭되는 영역
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>(); // 완료된 크롭
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageOrientation, setImageOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const { croppedImageUrl, makeCroppedImage } = useCropImage(imageRef, completedCrop || null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    // 이미지 방향 판단
    if (height > width) {
      setImageOrientation('portrait');
    } else {
      setImageOrientation('landscape');
    }

    const newCrop = centerCrop(
      makeAspectCrop(
        // 초기 크롭 영역 설정
        {
          unit: '%', // 크롭 단위
          width: 100, // 크롭 영역 너비
        },
        aspectRatio,
        width,
        height,
      ),
      width,
      height,
    );

    setCrop(newCrop); // 계산된 초기 크롭 영역을 crop 상태에 반영
  };

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imageRef.current) {
      makeCroppedImage();
    }
  }, [completedCrop, makeCroppedImage]);

  const handleComplete = () => {
    if (croppedImageUrl) {
      onCropped(croppedImageUrl);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <ReactCrop
        className={`${styles.customReactCrop} ${styles.customReactCropVariants[imageOrientation]}`}
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={aspectRatio}
      >
        <img
          className={styles.customReactCropVariants[imageOrientation]}
          src={file}
          alt="원본"
          onLoad={onImageLoad}
          ref={imageRef}
        />
      </ReactCrop>
      <section className={styles.button_wrapper}>
        <Button onClick={onClose} variant="secondary">
          다시 선택하기
        </Button>
        <Button onClick={handleComplete}>감상할 영역 선택하기</Button>
      </section>
    </div>
  );
};

export default ImageEditor;
