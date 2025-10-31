import { useEffect, useState } from 'react'; // 1. useState를 import 합니다.
import { useSearchParams } from 'react-router-dom';
import * as styles from './Watch.css';
import { useRtcChannel } from '@/hooks/useRtcChannel';

const WatchConnection = () => {
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

const WatchPage = () => {
  const [startConnection, setStartConnection] = useState(false);

  const handleConnectClick = () => {
    setStartConnection(true);
  };

  if (!startConnection) {
    return (
      <div className={styles.container}>
        <button
          onClick={handleConnectClick}
          className={styles.text}
          style={{
            background: 'none',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          워치 연결 시작
        </button>
      </div>
    );
  }

  return <WatchConnection />;
};

export default WatchPage;
