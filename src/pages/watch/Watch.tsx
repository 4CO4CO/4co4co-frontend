import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as styles from './Watch.css';
import { useRtcChannel } from '@/hooks/useRtcChannel';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') || '';
  const sessionId = searchParams.get('sessionId') || '';

  const { state, setOnMessage } = useRtcChannel({ role: 'receiver', roomId, sessionId });

  useEffect(() => {
    setOnMessage((pkt: unknown) => {
      if (pkt && typeof pkt === 'object' && ('pattern' in pkt || 'dur' in pkt)) {
        const { pattern, dur } = pkt as { pattern?: number[]; dur?: number };
        if (Array.isArray(pattern)) navigator.vibrate(pattern);
        else if (dur) navigator.vibrate(dur);
      }
    });
  }, [setOnMessage]);

  return (
    <div className={styles.container}>
      {state === 'connected' ? (
        <>
          <p className={styles.text}>연결 완료</p>
          <div className={styles.visualizerCircle} />
        </>
      ) : (
        <p className={styles.text}>연결 중...</p>
      )}
    </div>
  );
};

export default WatchPage;
