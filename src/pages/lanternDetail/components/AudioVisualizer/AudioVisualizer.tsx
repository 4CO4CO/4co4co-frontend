import { useRef, useEffect, useCallback } from 'react';
import * as styles from './AudioVisualizer.css';

interface AudioVisualizerProps {
  currentIndex: number;
  totalTracks: number;
  isPlaying: boolean;
  analyser: AnalyserNode | null;
}

export const AudioVisualizer = ({
  currentIndex,
  totalTracks,
  isPlaying,
  analyser
}: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasDimensionsRef = useRef({ width: 0, height: 0 });
  const barDataCache = useRef<number[]>(new Array(24).fill(0));

  // 주파수 데이터 배열 초기화
  const initializeDataArray = useCallback(() => {
    if (analyser && !dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  }, [analyser]);

  // 캔버스 렌더링 컨텍스트 초기 설정
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasContextRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvasContextRef.current = ctx;
    canvasDimensionsRef.current = {
      width: canvas.width,
      height: canvas.height
    };

    ctx.imageSmoothingEnabled = false;
  }, []);

  // 전체 주파수 스펙트럼에서 시각화용 24개 바 데이터 추출
  const extractFrequencyData = useCallback((dataArray: Uint8Array) => {
    const barCount = 24;
    const frequencyStep = Math.floor(dataArray.length / barCount);
    const cachedBars = barDataCache.current;

    for (let i = 0; i < barCount; i++) {
      const index = Math.min(i * frequencyStep, dataArray.length - 1);
      cachedBars[i] = dataArray[index];
    }

    return cachedBars;
  }, []);

  // 주파수 영역별 색상 계산
  const calculateBarColor = (barIndex: number, normalizedValue: number) => {
    let hue, saturation, lightness;

    if (barIndex < 8) { // 저주파 영역
      hue = normalizedValue * 30;
      saturation = 80;
      lightness = 45 + normalizedValue * 25;
    } else if (barIndex < 16) { // 중주파 영역
      hue = 200 + normalizedValue * 40;
      saturation = 70;
      lightness = 50 + normalizedValue * 20;
    } else { // 고주파 영역
      hue = 270 + normalizedValue * 50;
      saturation = 75;
      lightness = 55 + normalizedValue * 15;
    }

    return { hue, saturation, lightness };
  };

  // 메인 시각화 렌더링 함수
  const draw = useCallback(() => {
    if (!analyser || !canvasContextRef.current || !dataArrayRef.current) return;

    const ctx = canvasContextRef.current;
    const { width, height } = canvasDimensionsRef.current;
    const dataArray = dataArrayRef.current;

    // 최신 주파수 데이터 가져오기
    analyser.getByteFrequencyData(dataArray);
    const barData = extractFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);

    const barCount = 24;
    const barWidth = width / barCount;

    // 전체 에너지 기반 동적 증폭 계산
    let totalEnergy = 0;
    for (let i = 0; i < barCount; i++) {
      totalEnergy += barData[i];
    }
    const avgEnergy = totalEnergy / barCount;
    const energyMultiplier = Math.max(1, avgEnergy / 50);

    // 각 주파수 바 렌더링
    for (let i = 0; i < barCount; i++) {
      const value = barData[i];
      const normalizedValue = value / 255;

      // 바 높이 계산
      let barHeight = normalizedValue * height * 0.85;
      barHeight *= energyMultiplier;
      barHeight = Math.max(1, Math.min(barHeight, height - 2));

      const { hue, saturation, lightness } = calculateBarColor(i, normalizedValue);
      const x = i * barWidth;
      const y = height - barHeight;

      // 기본 바 그리기
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fillRect(x + 1, y, barWidth - 2, barHeight);

      // 높은 주파수 값에 글로우 효과 추가
      if (value > 100) {
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness + 20}%, 0.4)`;
        ctx.fillRect(x, y - 1, barWidth, barHeight + 2);

        // 매우 높은 값에는 하이라이트 효과
        if (value > 150) {
          ctx.fillStyle = `hsla(${hue}, 90%, 80%, 0.8)`;
          ctx.fillRect(x + 1, y, barWidth - 2, 2);
        }
      }
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [analyser, isPlaying, extractFrequencyData]);

  // AnalyserNode 변경 시 초기화
  useEffect(() => {
    initializeDataArray();
    initializeCanvas();
  }, [analyser, initializeDataArray, initializeCanvas]);

  // 재생 상태에 따른 애니메이션 시작/정지 제어
  useEffect(() => {
    // 애니메이션 실행 중
    if (isPlaying && analyser && canvasContextRef.current) {
      if (!animationRef.current) {
        draw();
      }
    } else {
      // 애니메이션 정지
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
  }, [draw, isPlaying, analyser]);

  return (
    <div className={styles.container}>
      <div className={styles.trackInfo}>
        🎧 Track {currentIndex + 1}/{totalTracks}
      </div>

      <div className={styles.visualizer}>
        <canvas
          ref={canvasRef}
          width={300}
          height={60}
          className={styles.canvas}
        />
        {!isPlaying && (
          <div className={styles.placeholder}>
            ⏸ PAUSED
          </div>
        )}
      </div>
    </div>
  );
};