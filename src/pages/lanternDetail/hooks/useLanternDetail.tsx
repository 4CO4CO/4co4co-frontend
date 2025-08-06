import { useState, useEffect } from 'react';
import { get, ApiError } from '@/apis';
import { LanternData } from '@/components/common/lantern/constants';

interface LanternDetailApiResponse {
  status: 'success';
  message: string;
  data: {
    lantern_id: string;
    owner_name: string;
    images: string[];
    background_sounds: string[];
  };
}

// 이미지 URL 변환
const getFullImageUrl = (imagePath: string): string => {
  const s3BaseUrl = import.meta.env.VITE_S3_BASE_URL;
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return `${s3BaseUrl}${normalizedPath}`;
};

// 오디오 URL 변환 (새로 추가)
const getFullAudioUrl = (audioPath: string): string => {
  if (audioPath.startsWith('http://') || audioPath.startsWith('https://')) {
    return audioPath;
  }

  const s3BaseUrl = import.meta.env.VITE_S3_BASE_URL;
  const normalizedPath = audioPath.startsWith('/') ? audioPath : `/${audioPath}`;
  return `${s3BaseUrl}${normalizedPath}`;
};

const fetchLanternDetail = async (lanternId: string, currentLanternId?: string): Promise<LanternData> => {
  const params = currentLanternId ? { current_lantern_id: currentLanternId } : {};

  const response = await get<LanternDetailApiResponse>(`/lanterns/${lanternId}`, { params });

  return {
    lantern_id: response.data.lantern_id,
    owner_name: response.data.owner_name,
    images: response.data.images.map(getFullImageUrl),
    background_sounds: response.data.background_sounds.map(getFullAudioUrl),
  };
};

const getErrorMessage = (error: ApiError): string => {
  switch (error.status) {
    case 400:
      return '잘못된 랜턴 ID 형식입니다.';
    case 403:
      return '비공개 랜턴입니다.';
    case 404:
      return '요청하신 랜턴을 찾을 수 없습니다.';
    case 500:
      return '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return error.message || '풍등 데이터를 불러오는데 실패했습니다.';
  }
};

export const useLanternDetail = (lanternId: string | undefined) => {
  const [data, setData] = useState<LanternData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!lanternId) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchLanternDetail(lanternId);
      setData(result);
    } catch (err) {
      console.error('풍등 데이터 조회 실패:', err);

      const errorMessage = err instanceof ApiError ? getErrorMessage(err) : '풍등 데이터를 불러오는데 실패했습니다.';

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lanternId]);

  const retry = () => {
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    retry,
  };
};
