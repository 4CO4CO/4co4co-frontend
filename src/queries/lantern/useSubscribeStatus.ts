import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { lanternKeys } from '../queryKey';
import { CustomSseError, MusicStatusData, subscribeStatus } from '@/apis/lantern/subscribeStatus';

interface UseSubscribeStatusProps {
  lanternId: string;
  onPartial?: (data: MusicStatusData) => void;
  onDone?: () => void;
  onError?: (error: Event | CustomSseError) => void;
}

export const useSubscribeStatus = ({ lanternId, onPartial, onDone, onError }: UseSubscribeStatusProps) => {
  const queryClient = useQueryClient();

  const progressQueryKey = lanternKeys.progress(lanternId);

  const handlePartialMessage = useCallback(
    (data: MusicStatusData) => {
      onPartial?.(data);
    },
    [onPartial],
  );

  const handleAllDone = useCallback(
    (data: MusicStatusData[]) => {
      queryClient.setQueryData(progressQueryKey, data);

      queryClient.invalidateQueries({ queryKey: lanternKeys.lists() });

      onDone?.();
    },
    [onDone, queryClient, progressQueryKey],
  );

  const handleSseError = useCallback(
    (error: CustomSseError) => {
      console.error('SSE 훅에서 에러 발생:', error);
      onError?.(error);
      if (error.eventType === 'server_sent_error_event' && error.serverErrorData) {
        console.error('서버에서 보낸 비즈니스 에러:', error.serverErrorData.message);
      } else if (error.eventType === 'sse_connection_error') {
        console.error('SSE 연결 자체 오류:', error.message);
      } else if (error.eventType === 'parsing_error') {
        console.error('SSE 메시지 파싱 오류:', error.message);
      }
    },
    [onError],
  );

  useEffect(() => {
    if (!lanternId) {
      console.warn('lanternId가 유효하지 않습니다.');
      return;
    }

    const cachedProgress = queryClient.getQueryData<MusicStatusData | MusicStatusData[]>(progressQueryKey);
    const isAlreadyCompleted = Array.isArray(cachedProgress) || cachedProgress?.status === 'success';

    if (isAlreadyCompleted) {
      console.log(`[SSE] lanternId ${lanternId}는 이미 완료 상태로 판단되어 SSE 연결 생략`);
      onDone?.();
      return;
    }

    const unsubscribe = subscribeStatus({
      lanternId,
      onPartialMessage: handlePartialMessage,
      onAllDone: handleAllDone,
      onError: handleSseError,
    });

    return () => {
      unsubscribe();
      console.log(`[SSE] lanternId ${lanternId}에 대한 SSE 연결 클린업`);
    };
  }, [lanternId, handlePartialMessage, handleAllDone, handleSseError, queryClient, progressQueryKey]);
};
