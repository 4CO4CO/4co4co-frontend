import { useRef } from 'react';
import * as styles from './AudioVisualizer.css';
import { useAudioVisualizer } from '../../hooks/useAudioVisualizer';
import { useCanvas } from '../../hooks/useCanvas';

interface AudioVisualizerProps {
  currentIndex: number;
  totalTracks: number;
  isPlaying: boolean;
  analyser: AnalyserNode | null;
}

const AudioVisualizer = ({ isPlaying, analyser }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ctxRef, sizeRef } = useCanvas(canvasRef); // 캔버스 초기화 및 크기 관리
  // 오디오 시각화
  useAudioVisualizer({
    isPlaying,
    analyser,
    canvasContextRef: ctxRef,
    canvasDimensionsRef: sizeRef,
  });

  return (
    <div className={styles.container}>
      <div className={styles.visualizer}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
};

export default AudioVisualizer;
