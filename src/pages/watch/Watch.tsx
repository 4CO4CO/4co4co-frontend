import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRtcChannel } from '@/hooks/useRtcChannel';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('currentLanternId');

  const { ready, setOnMessage } = useRtcChannel('receiver', roomId);

  useEffect(() => {
    if (!ready) return;
    setOnMessage((pkt: unknown) => {
      if (pkt && typeof pkt === 'object' && ('pattern' in pkt || 'dur' in pkt)) {
        const { pattern, dur } = pkt as { pattern?: number[]; dur?: number };
        if (Array.isArray(pattern)) navigator.vibrate(pattern);
        else if (dur) navigator.vibrate(dur);
      }
    });
  }, [ready, setOnMessage]);

  return <div>{ready ? <p>연결 완료! 진동 신호를 기다립니다.</p> : <p>연결 중...</p>}</div>;
};

export default WatchPage;
