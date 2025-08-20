import { useEffect, useRef, useState } from 'react';
import { useHandMark } from './useHandMark';
import { COOLDOWN_MS } from '@/pages/lanternDetail/constants/carousel';
import { isFist } from '@/utils';

interface UseHandGestureScrollProps {
  moveCarousel: (dir: 1 | -1) => void;
}

export const useHandGestureScroll = ({ moveCarousel }: UseHandGestureScrollProps) => {
  const { handCenter, marks } = useHandMark();
  const lastHandPositionRef = useRef<{ x: number; y: number } | null>(null);
  const skipGestureCooldownRef = useRef(false);
  const cooldownTimerRef = useRef<number | null>(null);
  const [isFistActive, setIsFistActive] = useState(false);

  useEffect(() => {
    // 언마운트 시 타이머 클린업
    return () => {
      if (cooldownTimerRef.current) {
        window.clearTimeout(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!handCenter || !marks) {
      // 손이 인식되지 않으면 상태 초기화
      setIsFistActive(false);
      lastHandPositionRef.current = null;
      return;
    }

    const currentFistState = isFist(marks);

    // 주먹을 쥐었을 때
    if (currentFistState && !isFistActive) {
      setIsFistActive(true);
      lastHandPositionRef.current = handCenter;
      return;
    }

    // 주먹을 풀었을 때
    if (!currentFistState && isFistActive) {
      setIsFistActive(false);
      lastHandPositionRef.current = null;
      return;
    }

    if (skipGestureCooldownRef.current || !isFistActive) return;

    if (lastHandPositionRef.current) {
      const deltaX = handCenter.x - lastHandPositionRef.current.x;
      const DELTA_TRIGGER = 200;

      // 오른쪽에서 왼쪽으로 이동
      if (deltaX < -DELTA_TRIGGER) {
        moveCarousel(1);
        // 다음 제스처를 위해 기준점 재설정
        lastHandPositionRef.current = { x: handCenter.x, y: handCenter.y };

        skipGestureCooldownRef.current = true;
        if (cooldownTimerRef.current) {
          window.clearTimeout(cooldownTimerRef.current);
        }
        cooldownTimerRef.current = window.setTimeout(() => {
          skipGestureCooldownRef.current = false;
          cooldownTimerRef.current = null;
        }, COOLDOWN_MS);
      }
      // 왼쪽에서 오른쪽으로 이동
      else if (deltaX > DELTA_TRIGGER) {
        moveCarousel(-1);
        // 다음 제스처를 위해 기준점 재설정
        lastHandPositionRef.current = { x: handCenter.x, y: handCenter.y };

        skipGestureCooldownRef.current = true;
        if (cooldownTimerRef.current) {
          window.clearTimeout(cooldownTimerRef.current);
        }
        cooldownTimerRef.current = window.setTimeout(() => {
          skipGestureCooldownRef.current = false;
          cooldownTimerRef.current = null;
        }, COOLDOWN_MS);
      }
    }

    lastHandPositionRef.current = handCenter;
  }, [handCenter, marks, isFistActive, moveCarousel]);
};
