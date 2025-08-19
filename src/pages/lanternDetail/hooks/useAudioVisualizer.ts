import { RefObject, useEffect, useRef, useCallback } from 'react';
import { ATTACK, BAR_COUNT, MAX_HZ, MIN_HZ, PALETTE, RELEASE } from '../constants/audio';
import { buildSegmentGradient, pathCatmullRom } from '../utils';

interface UseAudioVisualizerProps {
  isPlaying: boolean;
  analyser: AnalyserNode | null;
  canvasContextRef: RefObject<CanvasRenderingContext2D | null>;
  canvasDimensionsRef: RefObject<{ width: number; height: number }>;
}

/**
 * <오디오 시각화>
 * 오디오 분석 데이터를 실시간으로 가져와 캔버스에 파형 생성
 */
export const useAudioVisualizer = ({
  isPlaying,
  analyser,
  canvasContextRef,
  canvasDimensionsRef,
}: UseAudioVisualizerProps) => {
  const animationRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const bandsRef = useRef<Array<{ start: number; end: number }> | null>(null);
  const barDataCache = useRef<number[]>(new Array(BAR_COUNT).fill(0));
  const smoothRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));

  // DataArray 초기화
  const initializeDataArray = useCallback(() => {
    if (analyser && !dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  }, [analyser]);

  // 로그 스케일 밴드 구성
  // 저주파 영역을 넓게, 고주파 영역을 좁게 (인간의 청각은 저주파에 더 민감)
  const buildLogBands = useCallback(() => {
    if (!analyser) return;
    const sampleRate = analyser.context.sampleRate;
    const binHz = sampleRate / analyser.fftSize;
    const bands: Array<{ start: number; end: number }> = [];

    for (let i = 0; i < BAR_COUNT; i++) {
      const t0 = i / (BAR_COUNT - 1);
      const t1 = (i + 1) / (BAR_COUNT - 1);
      const hz0 = MIN_HZ * Math.pow(MAX_HZ / MIN_HZ, t0);
      const hz1 = MIN_HZ * Math.pow(MAX_HZ / MIN_HZ, t1);
      const start = Math.min(analyser.frequencyBinCount - 1, Math.max(0, Math.floor(hz0 / binHz)));
      const end = Math.min(analyser.frequencyBinCount, Math.max(start + 1, Math.floor(hz1 / binHz)));
      bands.push({ start, end });
    }
    bandsRef.current = bands;
  }, [analyser]);

  // 주파수 BAR_COUNT에 맞춰 평균을 내어 집계
  const extractFrequencyData = useCallback((dataArray: Uint8Array) => {
    const bands = bandsRef.current!;
    const out = barDataCache.current;
    for (let i = 0; i < bands.length; i++) {
      const { start, end } = bands[i];
      let sum = 0;
      for (let b = start; b < end; b++) sum += dataArray[b] || 0;
      out[i] = sum / Math.max(1, end - start);
    }
    return out;
  }, []);

  // 시간 스무딩
  // 갑작스러운 파형 변화를 부드럽게
  const smoothBars = useCallback((input: number[]) => {
    const s = smoothRef.current;
    for (let i = 0; i < input.length; i++) {
      const target = input[i];
      const cur = s[i];
      const k = target > cur ? ATTACK : RELEASE;
      s[i] = cur + (target - cur) * k;
    }
    return s;
  }, []);

  const draw = useCallback(() => {
    if (!analyser || !canvasContextRef.current || !dataArrayRef.current) return;

    const ctx = canvasContextRef.current;
    const { width, height } = canvasDimensionsRef.current;
    const dataArray = dataArrayRef.current;

    analyser.getByteFrequencyData(dataArray); // 주파수 집계
    const bars = smoothBars(extractFrequencyData(dataArray)); // 시간 스무딩
    ctx.clearRect(0, 0, width, height); // 이전 프레임 삭제

    // 포인트 생성
    const points = bars.map((v, i) => {
      const x = (i / (BAR_COUNT - 1)) * width;
      const y = height - (v / 255) * (height * 0.9);
      return { x, y };
    });

    // 색상 그라데이션
    const gradient = buildSegmentGradient(ctx, width, PALETTE);

    // 오프스크린 생성
    const off = document.createElement('canvas');
    off.width = Math.max(1, Math.floor(width));
    off.height = Math.max(1, Math.floor(height));
    const octx = off.getContext('2d')!;
    octx.fillStyle = gradient;

    // 파형 경로
    octx.beginPath();
    octx.moveTo(0, height);
    pathCatmullRom(octx, [{ x: 0, y: height }, ...points, { x: width, y: height }]);
    octx.closePath();
    octx.fill();

    // 블러 효과
    ctx.filter = 'blur(4px)';
    ctx.globalAlpha = 1.0;
    ctx.drawImage(off, 0, 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 0;
    ctx.drawImage(off, 0, 0);

    // 파형의 아랫부분이 점점 투명해지면서 사라지는 효과
    const fade = ctx.createLinearGradient(0, height * 0.45, 0, height);
    fade.addColorStop(0, 'rgba(0,0,0,0)');
    fade.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.globalCompositeOperation = 'destination-out'; // 투명하게
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    // 흰색 그라데이션을 덧씌워 파형의 윗부분에 빛이 비치는 효과
    const shine = ctx.createLinearGradient(0, 0, 0, height);
    shine.addColorStop(0, 'rgba(255,255,255,0.30)');
    shine.addColorStop(0.5, 'rgba(255,255,255,0.10)');
    shine.addColorStop(1, 'rgba(255,255,255,0.00)');
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    ctx.restore();

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [analyser, isPlaying, extractFrequencyData, smoothBars, canvasContextRef, canvasDimensionsRef]);

  // 초기화 및 애니메이션 제어 로직
  useEffect(() => {
    initializeDataArray();
    buildLogBands();

    if (analyser) {
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.85;
    }
  }, [analyser, initializeDataArray, buildLogBands]);

  useEffect(() => {
    if (isPlaying && analyser && canvasContextRef.current && dataArrayRef.current) {
      if (!animationRef.current) {
        draw();
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [draw, isPlaying, analyser, canvasContextRef, dataArrayRef]);
};
