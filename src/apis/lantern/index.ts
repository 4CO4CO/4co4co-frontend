import axios from 'axios';
import { get, post } from '..';

export interface CreateLanternRequestBody {
  name: string;
  images: File[];
  is_public?: boolean;
}

export interface CreateLanternResponse {
  status: string;
  message: string;
  data: {
    lantern_id: string;
  };
}

export const createLantern = async (data: CreateLanternRequestBody): Promise<CreateLanternResponse> => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    data.images.forEach((file) => {
      formData.append('images', file);
    });
    if (data.is_public !== undefined) {
      formData.append('is_public', String(data.is_public));
    }

    const response = post<CreateLanternResponse>('/lanterns', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('API call error in createLantern:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || '알 수 없는 서버 오류');
    }
    throw error;
  }
};

export interface LanternListResponse {
  status: string;
  message: string;
  data: {
    lantern_id: string;
    owner_name: string;
    emotion: string;
    is_current_lantern: boolean;
  }[];
}

export const getLanternList = (currentLanternId: string | null) => {
  if (currentLanternId) return get<LanternListResponse>(`/lanterns?current_lantern_id=${currentLanternId}`);
  return get<LanternListResponse>(`/lanterns`);
};
