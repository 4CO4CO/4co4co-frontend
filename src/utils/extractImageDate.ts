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

const getFormattedDate = (dateObj: Date): string => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateToDate = (metadata: ExifMetadata, file: File): string | null => {
  let dateString: string | undefined = undefined;

  // 메타데이터에서 날짜 사용
  if (metadata) {
    dateString = metadata.DateTimeOriginal || metadata.ModifyDate;
    if (dateString) {
      const dateObj = new Date(dateString);
      return getFormattedDate(dateObj);
    }
  }

  // 메타데이터에 날짜가 없는 경우 파일명 사용
  const filename = file.name;

  // 13자리 타임스탬프 형식 (예: 1740232035276-3.jpg)
  const timestampRegex = /(\d{13})/;
  const dateWithHyphenRegex = /(\d{4}-\d{2}-\d{2})/;
  const dateWithoutHyphenRegex = /(\d{8})/;

  const timestampMatch = filename.match(timestampRegex);
  if (timestampMatch && timestampMatch[1]) {
    const dateObj = new Date(Number(timestampMatch[1]));
    return getFormattedDate(dateObj);
  }

  // 파일명 내 'YYYY-MM-DD' 형식 (예: IMG-2025-02-22.jpg)
  const hyphenMatch = filename.match(dateWithHyphenRegex);
  if (hyphenMatch && hyphenMatch[1]) {
    return hyphenMatch[1];
  }

  // 파일명 내 'YYYYMMDD' 형식 (예: 20250222_193001.jpg)
  const noHyphenMatch = filename.match(dateWithoutHyphenRegex);
  if (noHyphenMatch && noHyphenMatch[1]) {
    const year = noHyphenMatch[1].substring(0, 4);
    const month = noHyphenMatch[1].substring(4, 6);
    const day = noHyphenMatch[1].substring(6, 8);
    return `${year}-${month}-${day}`;
  }

  return null;
};
