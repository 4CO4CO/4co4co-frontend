import { useEffect, useRef } from 'react';
import { useHandMarkContext } from '@/context/HandMarkContext';
import { isFist } from '@/utils';

type Options = {
  enabled?: boolean; // 이미 시작했으면 false 주면 꺼짐
  maxMovePx?: number; // 쥐고 있는 동안 허용 이동 반경 (제자리 판정)
  minHoldMs?: number; // 최소 유지 시간
  maxHoldMs?: number; // 최대 유지 시간
  cooldownMs?: number; // 한 번 인식 후 재인식까지 쿨다운
};

export const useZoomGesture = (onTrigger: () => void | boolean | Promise<void | boolean>, opts: Options = {}) => {
  const { handCenter, marks } = useHandMarkContext();
  const { maxMovePx = 100, minHoldMs = 0, maxHoldMs = 1500, cooldownMs = 800, enabled = true } = opts;

  const fistRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const startTimeRef = useRef<number>(0);
  const coolingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (!marks || !handCenter) {
      fistRef.current = false;
      startPosRef.current = null;
      return;
    }

    const fist = isFist(marks);
    const now = performance.now();

    // 주먹 시작
    if (fist && !fistRef.current) {
      fistRef.current = true;
      startPosRef.current = handCenter;
      startTimeRef.current = now;
      return;
    }

    if (fist && startPosRef.current) {
      const dx = handCenter.x - startPosRef.current.x;
      const dy = handCenter.y - startPosRef.current.y;
      if (dx * dx + dy * dy > maxMovePx * maxMovePx) {
        startPosRef.current = handCenter;
        startTimeRef.current = now;
      }
      return;
    }

    // 주먹 해제
    if (!fist && fistRef.current) {
      fistRef.current = false;
      const pos0 = startPosRef.current;
      startPosRef.current = null;
      const dt = now - startTimeRef.current;

      if (!coolingRef.current && pos0) {
        const dx = handCenter.x - pos0.x;
        const dy = handCenter.y - pos0.y;
        const stationary = dx * dx + dy * dy <= maxMovePx * maxMovePx;
        const holdOk = dt >= minHoldMs && dt <= maxHoldMs;

        if (stationary && holdOk) {
          coolingRef.current = true;
          Promise.resolve(onTrigger()).finally(() => {
            setTimeout(() => (coolingRef.current = false), cooldownMs);
          });
        }
      }
      return;
    }
  }, [marks, handCenter, enabled, maxMovePx, minHoldMs, maxHoldMs, cooldownMs, onTrigger]);
};
