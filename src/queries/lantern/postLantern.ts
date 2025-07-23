import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createLantern, CreateLanternRequestBody, CreateLanternResponse } from '@/apis/lantern';

export const usePostLantern = () => {
  const navigate = useNavigate();
  return useMutation<CreateLanternResponse, Error, CreateLanternRequestBody, unknown>({
    mutationFn: createLantern,
    onSuccess: (data) => {
      navigate('/loading', { state: { lantern_id: data.data.lantern_id } });
    },
    onError: (error) => {
      console.error('랜턴 생성 실패:', error);
      alert(`랜턴 생성에 실패했습니다: ${error.message}`);
    },
  });
};
