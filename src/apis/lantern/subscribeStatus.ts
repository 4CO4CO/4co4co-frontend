import { instance } from '..';

export interface MusicStatusData {
  image_s3: string;
  task_id: string;
  status: string;
  s3_key: string;
}

export interface MusicDonePartialEvent extends MessageEvent {
  data: string;
}

export interface ServerSseErrorData {
  message: string;
}

export interface CustomSseError extends Error {
  eventType: 'sse_connection_error' | 'server_sent_error_event' | 'parsing_error';
  originalEvent?: Event;
  serverErrorData?: ServerSseErrorData;
}

interface SSEOptions {
  lanternId: string;
  onPartialMessage: (data: MusicStatusData) => void;
  onAllDone: (data: MusicStatusData[]) => void;
  onDone?: () => void;
  onError?: (error: CustomSseError) => void;
}

export const subscribeStatus = ({ lanternId, onPartialMessage, onAllDone, onDone, onError }: SSEOptions) => {
  const url = new URL(`/api/v1/lanterns/${encodeURIComponent(lanternId)}/music-status`, instance.defaults.baseURL);
  url.searchParams.set('resume', 'false');

  const eventSource = new EventSource(url.toString());

  eventSource.onopen = () => {
    console.log('SSE 연결이 열렸습니다.');
  };

  eventSource.addEventListener('music_done_partial', (event: MessageEvent) => {
    try {
      const parsedData: MusicStatusData = JSON.parse(event.data);
      onPartialMessage(parsedData);
    } catch (e) {
      console.error('music_done_partial 데이터 파싱 오류:', e, event.data);
    }
  });

  eventSource.addEventListener('music_done_all', (event: MessageEvent) => {
    try {
      const parsedData: MusicStatusData[] = JSON.parse(event.data);
      onAllDone(parsedData);
      onDone?.();
      eventSource.close();
    } catch (e) {
      console.error('music_done_all 데이터 파싱 오류:', e, event.data);
    }
  });

  eventSource.addEventListener('error', (event: MessageEvent) => {
    let serverError: ServerSseErrorData | undefined;
    try {
      serverError = JSON.parse(event.data);
      console.error('[SSE 서버 error 이벤트 수신]', serverError);

      const customError: CustomSseError = {
        name: 'ServerSentError',
        message: serverError?.message || '서버로부터 알 수 없는 에러 이벤트 수신',
        eventType: 'server_sent_error_event',
        originalEvent: event,
        serverErrorData: serverError,
      };
      onError?.(customError);
    } catch (e) {
      console.error('[SSE error] 서버 메시지 파싱 실패:', e, event.data);
      const customError: CustomSseError = {
        name: 'SseServerErrorParsingError',
        message: `서버 에러 메시지 파싱 실패: ${event.data}`,
        eventType: 'parsing_error',
        originalEvent: event,
      };
      onError?.(customError);
    }
  });

  eventSource.onmessage = (event) => {
    console.log('일반 메시지 수신:', event.data);
  };

  eventSource.onerror = (err: Event) => {
    console.error('SSE 연결 오류:', err);
    const customError: CustomSseError = {
      name: 'SseConnectionError',
      message: 'SSE 연결 중 알 수 없는 오류가 발생했습니다.',
      eventType: 'sse_connection_error',
      originalEvent: err,
    };
    onError?.(customError);
    eventSource.close();
  };

  return () => {
    if (eventSource.readyState !== EventSource.CLOSED) {
      eventSource.close();
    }
  };
};
