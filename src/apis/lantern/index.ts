import { post } from '..';

export interface CreateLanternRequestBody {
  name: string;
  images: File[];
  is_public?: boolean;
}

export interface CreateLanternResponse {
  lantern_id: string;
}

export const createLantern = async (data: CreateLanternRequestBody): Promise<CreateLanternResponse> => {
  const formData = new FormData();
  formData.append('name', data.name);
  data.images.forEach((file) => {
    formData.append('images', file);
  });
  if (data.is_public !== undefined) {
    formData.append('is_public', String(data.is_public));
  }

  return post<CreateLanternResponse>('/lanterns', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
