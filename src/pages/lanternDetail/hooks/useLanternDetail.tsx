import { useQuery } from '@tanstack/react-query';
import { get, ApiError } from '@/apis';
import { LanternData } from '@/components/common/lantern/constants';
import { lanternKeys } from '@/queries/queryKey';

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

// 오디오 URL 변환
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

export const useLanternDetail = (lanternId?: string, currentLanternId?: string) => {
  const query = useQuery({
    queryKey: lanternKeys.detail(lanternId ?? '__nil__'),
    queryFn: () => fetchLanternDetail(lanternId as string, currentLanternId),
    enabled: !!lanternId,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError) {
        if ([400, 403, 404].includes(error.status)) return false;
      }
      return failureCount < 2;
    },
  });

  const isLoading = query.isPending;

  const errorMessage =
    query.error instanceof ApiError
      ? getErrorMessage(query.error)
      : query.error
      ? '풍등 데이터를 불러오는데 실패했습니다.'
      : null;

  return {
    data: query.data,
    isLoading,
    error: errorMessage,
    refetch: query.refetch,
  };
};
