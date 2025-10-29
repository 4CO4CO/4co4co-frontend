import { useEffect, useRef, useState, useCallback } from 'react';
import { useHandMarkContext } from '@/context/HandMarkContext';
import { COOLDOWN_MS } from '@/pages/lanternDetail/constants/carousel';
import { isFist } from '@/utils';

interface UseHandGestureScrollProps {
  moveCarousel: (dir: 1 | -1) => void;
}

export const useHandGestureScroll = ({ moveCarousel }: UseHandGestureScrollProps) => {
  const { handCenter, marks } = useHandMarkContext();
  const lastHandPositionRef = useRef<{ x: number; y: number } | null>(null);
  const skipGestureCooldownRef = useRef(false);
  const cooldownTimerRef = useRef<number | null>(null);
  const [isFistActive, setIsFistActive] = useState(false);
  const isProcessingRef = useRef(false);

  // 타이머 클린업 함수
  const clearCooldownTimer = useCallback(() => {
    if (cooldownTimerRef.current) {
      window.clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
  }, []);

  // 상태 초기화 함수
  const resetGestureState = useCallback(() => {
    setIsFistActive(false);
    lastHandPositionRef.current = null;
    skipGestureCooldownRef.current = false;
    isProcessingRef.current = false;
    clearCooldownTimer();
  }, [clearCooldownTimer]);

  // 언마운트 시 클린업
  useEffect(() => {
    return () => {
      clearCooldownTimer();
      isProcessingRef.current = false;
    };
  }, [clearCooldownTimer]);

  // 쿨다운 설정 함수
  const setCooldown = useCallback(() => {
    skipGestureCooldownRef.current = true;
    clearCooldownTimer();
    cooldownTimerRef.current = window.setTimeout(() => {
      skipGestureCooldownRef.current = false;
      cooldownTimerRef.current = null;
    }, COOLDOWN_MS);
  }, [clearCooldownTimer]);

  useEffect(() => {
    // 이미 처리 중이면 스킵
    if (isProcessingRef.current) {
      return;
    }

    // 손이 인식되지 않으면 상태 초기화
    if (!handCenter || !marks) {
      resetGestureState();
      return;
    }

    try {
      isProcessingRef.current = true;

      const currentFistState = isFist(marks);

      // 주먹을 쥐었을 때
      if (currentFistState && !isFistActive) {
        setIsFistActive(true);
        // 주먹을 쥐었을 때의 위치 저장
        lastHandPositionRef.current = { ...handCenter };
        isProcessingRef.current = false;
        console.log('주먹쥐고~');
        return;
      }

      // 주먹을 풀었을 때
      if (!currentFistState && isFistActive) {
        setIsFistActive(false);
        lastHandPositionRef.current = null;
        isProcessingRef.current = false;
        console.log('손을 펴서~');
        return;
      }

      // 쿨다운 중이거나 주먹이 활성화되지 않은 경우
      if (skipGestureCooldownRef.current || !isFistActive) {
        isProcessingRef.current = false;
        return;
      }

      if (lastHandPositionRef.current) {
        const deltaX = handCenter.x - lastHandPositionRef.current.x;
        const DELTA_TRIGGER = 20;
        console.log('deltaX', deltaX);
        // 오른쪽에서 왼쪽으로 이동 (다음 이미지)
        if (deltaX < -DELTA_TRIGGER) {
          console.log('다음으로!');
          moveCarousel(1);
          // 다음 제스처를 위해 기준점 재설정
          lastHandPositionRef.current = { x: handCenter.x, y: handCenter.y };
          setCooldown();
        }
        // 왼쪽에서 오른쪽으로 이동 (이전 이미지)
        else if (deltaX > DELTA_TRIGGER) {
          console.log('이전으로!!');
          moveCarousel(-1);
          lastHandPositionRef.current = { x: handCenter.x, y: handCenter.y };
          setCooldown();
        } else {
          // 다음 제스처를 위해 기준점 재설정
          lastHandPositionRef.current = { x: handCenter.x, y: handCenter.y };
        }
      }
    } catch (error) {
      console.error('HandGestureScroll 처리 중 오류:', error);
      resetGestureState();
    } finally {
      isProcessingRef.current = false;
    }
  }, [handCenter, marks, isFistActive, moveCarousel, setCooldown, resetGestureState]);
};
