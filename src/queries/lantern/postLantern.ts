import { useMutation } from '@tanstack/react-query';
import { createLantern, CreateLanternRequestBody, CreateLanternResponse } from '@/apis/lantern';

export const usePostLantern = () => {
  return useMutation<CreateLanternResponse, Error, CreateLanternRequestBody, unknown>({
    mutationFn: createLantern,
    onSuccess: (data) => {
      console.log('랜턴 생성 성공:', data);
    },
    onError: (error) => {
      console.error('랜턴 생성 실패:', error);
      alert(`랜턴 생성에 실패했습니다: ${error.message}`);
    },
  });
};
