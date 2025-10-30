import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHandMarkContext } from '@/context/HandMarkContext';
import { isFist, isInside } from '@/utils';

export const useCloseGesture = (closeButtonRef: React.RefObject<HTMLButtonElement | null>) => {
  const navigate = useNavigate();
  const coolDownRef = useRef(false);
  const fistStartTimeRef = useRef<number>(0);
  const { handCenter, marks, handedness } = useHandMarkContext();

  // 경로 이름 불러오기
  const path = window.location.pathname;

  // 네비게이션 실행 함수
  const executeNavigation = useCallback(() => {
    if (coolDownRef.current) return;

    coolDownRef.current = true;

    if (path.startsWith('/lanterns/')) {
      navigate(-1);
    } else {
      navigate('/');
    }

    // 2초 후 쿨다운 해제
    setTimeout(() => {
      coolDownRef.current = false;
    }, 2000);
  }, [path, navigate]);

  useEffect(() => {
    if (!handCenter || !marks || !handedness || !closeButtonRef.current) {
      fistStartTimeRef.current = 0;
      return;
    }

    const rect = closeButtonRef.current.getBoundingClientRect();
    const fist = isFist(marks);
    const now = Date.now();

    // 디버깅용 로그
    // console.info('손 상태:', { fist, handCenter, isInside: isInside(handCenter, rect) });

    if (fist && isInside(handCenter, rect)) {
      // 주먹을 처음 쥔 시점 기록
      if (fistStartTimeRef.current === 0) {
        fistStartTimeRef.current = now;
        console.info('주먹 시작 시간 기록');
      }

      // 0.5초 이상 주먹을 유지했으면 네비게이션 실행
      if (now - fistStartTimeRef.current >= 500 && !coolDownRef.current) {
        console.info('네비게이션 조건 충족!');
        executeNavigation();
        fistStartTimeRef.current = 0;
      }
    } else {
      // 주먹을 풀거나 영역을 벗어나면 시간 리셋
      fistStartTimeRef.current = 0;
    }
  }, [marks, handCenter, handedness, closeButtonRef, executeNavigation]);

  return { marks, handedness };
};
