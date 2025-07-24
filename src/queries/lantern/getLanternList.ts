import { useQuery } from '@tanstack/react-query';
import { lanternKeys } from '../queryKey';
import { getLanternList } from '@/apis/lantern';

export const useLanternList = (currentLanternId: string | null) => {
  return useQuery({
    queryKey: lanternKeys.list(currentLanternId ?? ''),
    queryFn: () => getLanternList(currentLanternId),
  });
};
