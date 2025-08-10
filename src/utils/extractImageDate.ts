import exifr from 'exifr';

type ExifMetadata = {
  DateTimeOriginal?: string;
  ModifyDate?: string;
};

export const extractImageMetadata = async (file: File) => {
  try {
    const metadata = await exifr.parse(file);
    return metadata;
  } catch (error) {
    console.error('Failed to extract EXIF data:', error);
    return null;
  }
};

export const formatDateToDate = (metadata: ExifMetadata): string | null => {
  // DateTimeOriginal 또는 ModifyDate 속성에서 날짜 문자열을 가져옵니다.
  const dateString = metadata?.DateTimeOriginal || metadata?.ModifyDate;

  if (dateString) {
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  return null;
};
