import { RefObject, useCallback, useEffect, useState } from 'react';
import { PixelCrop } from 'react-image-crop';

export const useCropImage = (imageRef: RefObject<HTMLImageElement | null>, completedCrop: PixelCrop | null) => {
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>();

  const makeCroppedImage = useCallback(async () => {
    const image = imageRef?.current;
    const crop = completedCrop;

    if (!image || !crop) return;

    // 캔버스 크기를 원본 해상도 기준으로 설정
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const offscreen = new OffscreenCanvas(crop.width * scaleX, crop.height * scaleY);
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

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

    const blob = await offscreen.convertToBlob({ type: 'image/jpeg' });
    const fileUrl = URL.createObjectURL(blob);
    setCroppedImageUrl(fileUrl);
  }, [imageRef, completedCrop, croppedImageUrl]);

  // croppedImageUrl이 바뀌거나 언마운트될 때 이전 URL 클린업
  useEffect(() => {
    return () => {
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }
    };
  }, [croppedImageUrl]);

  return { croppedImageUrl, makeCroppedImage };
};
