import { useQuery, useQueryClient } from '@tanstack/react-query';
import { lanternKeys } from '../queryKey';
import { MusicStatusData } from '@/apis/lantern/subscribeStatus';

export const useCachedLanternProgress = (lanternId: string | null) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: lanternKeys.progress(lanternId ?? ''),
    queryFn: async () => {
      if (!lanternId) return null;
      const cached = queryClient.getQueryData<MusicStatusData | MusicStatusData[]>(lanternKeys.progress(lanternId));
      return cached || null;
    },
    enabled: !!lanternId,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
