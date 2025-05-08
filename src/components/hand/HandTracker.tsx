import { useEffect } from 'react';
import { useHandMark } from './hooks/useHandMark';

export const HandTracker = ({ onUpdate }: { onUpdate: (pos: { x: number; y: number }) => void }) => {
  const { indexFingerTip } = useHandMark();

  useEffect(() => {
    if (indexFingerTip) onUpdate(indexFingerTip); // 손끝 좌표가 업데이트되면 상위로 전달
  }, [indexFingerTip]);

  return null;
};
