import axios from 'axios';
import { post } from '..';

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
