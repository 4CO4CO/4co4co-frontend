import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import * as styles from './index.css';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@/components/common/button';

interface ImageEditorProps {
  file: string;
  aspectRatio: number;
  onCropped: (croppedImageUrl: string) => void;
}

const ImageEditor = ({ file, aspectRatio = 10 / 9, onCropped }: ImageEditorProps) => {
  const [crop, setCrop] = useState<Crop>(); // 크롭되는 영역
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>(); // 완료된 크롭
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null); // 생성한 이미지 주소
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageOrientation, setImageOrientation] = useState<'portrait' | 'landscape'>('landscape');

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

  const makeCroppedImage = useCallback(async () => {
    const image = imageRef.current;
    const crop = completedCrop;

    if (!image || !crop) {
      return;
    }

    // 캔버스 크기를 원본 해상도 기준으로 설정
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const offscreen = new OffscreenCanvas(crop.width * scaleX, crop.height * scaleY);
    const ctx = offscreen.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.drawImage(
      // 원본 이미지 영역
      image,
      crop.x * scaleX, // 크롭 시작 x 좌표
      crop.y * scaleY, // 크롭 시작 y 좌표
      crop.width * scaleX, // 크롭할 이미지의 가로 길이
      crop.height * scaleY, // 크롭할 이미지의 세로 길이
      // 캔버스 영역
      0, // 캔버스에서 이미지 시작 x 좌표
      0, // 캔버스에서 이미지 시작 y 좌표
      crop.width * scaleX, // 캔버스에서 이미지의 가로 길이
      crop.height * scaleY, //  캔버스에서 이미지의 세로 길이
    );
    ctx.imageSmoothingQuality = 'high';

    const blob = await offscreen.convertToBlob({
      type: 'image/jpeg',
    });

    const fileUrl = URL.createObjectURL(blob);
    setCroppedImageUrl(fileUrl);
  }, [completedCrop]);

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
        <img className={styles.originImage} src={file} alt="원본" onLoad={onImageLoad} ref={imageRef} />
      </ReactCrop>
      <Button onClick={handleComplete}>감상할 영역 선택하기</Button>
    </div>
  );
};

export default ImageEditor;
