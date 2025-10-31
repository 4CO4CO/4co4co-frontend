import { RefObject, useEffect, useRef } from 'react';

/**
 * <캔버스 초기화 및 관리>
 * 1. HTML 캔버스 초기화
 * 2. 렌더링 컨텍스트를 제공
 * 3. 기기 해상도(DPR)와 브라우저 창 크기 변화에 자동 대응
 * 4. 컴포넌트 라이프사이클에 맞춰 ResizeObserver 정리
 *
 * @param canvasRef - 캔버스 DOM 요소에 연결된 React `useRef` 객체
 * @returns 캔버스 렌더링 컨텍스트와 크기 정보를 담고 있는 ref 객체
 */
export const useCanvas = <T extends HTMLCanvasElement>(canvasRef: RefObject<T | null>) => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null); // 캔버스 2D 렌더링 컨텍스트
  const sizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 }); // 캔버스 실제 크기

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      sizeRef.current = { width: rect.width, height: rect.height };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 캔버스 드로잉 영역 실제 해상도에 맞춰 확대
      ctx.imageSmoothingEnabled = true; // 이미지 스무딩
    };

    resize();
    // 캔버스 크기 변화 감지
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // 클린업
    return () => ro.disconnect();
  }, [canvasRef]);

  return { ctxRef, sizeRef };
};
