import { useEffect, useRef, useState } from 'react';
import { hzToBin } from '../utils';

export type AudioFeatures = {
  ts: number;
  rms: number; // 0..1
  bass: number; // 0..1 (30~180Hz)
  onset: boolean;
};

export function useAudioFeatures(analyser: AnalyserNode | null, fps = 30) {
  const [feat, setFeat] = useState<AudioFeatures | null>(null);

  const timeBufRef = useRef<Float32Array<ArrayBuffer> | null>(null);
  const freqRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const prevMagRef = useRef<Float32Array | null>(null);

  const emaRef = useRef({ rms: 0, bass: 0 });
  const fluxHistRef = useRef<number[]>([]);
  const onsetCooldownRef = useRef(0);

  useEffect(() => {
    if (!analyser) return;

    const ctx = analyser.context;
    analyser.smoothingTimeConstant = 0.6;

    if (!timeBufRef.current) timeBufRef.current = new Float32Array(analyser.fftSize);
    if (!freqRef.current) freqRef.current = new Uint8Array(analyser.frequencyBinCount);
    if (!prevMagRef.current) prevMagRef.current = new Float32Array(analyser.frequencyBinCount);

    const frameMs = Math.max(10, Math.round(1000 / fps));
    let stop = false;

    const loop = () => {
      if (stop) return;
      const now = performance.now();

      // 음악의 전체적인 음량 크기 측정 (RMS)
      const tbuf = timeBufRef.current!;
      analyser.getFloatTimeDomainData(tbuf);
      let sumSq = 0;
      for (let i = 0; i < tbuf.length; i++) sumSq += tbuf[i] * tbuf[i];
      const rmsRaw = Math.sqrt(sumSq / tbuf.length);

      // 주파수
      const fbuf = freqRef.current!;
      analyser.getByteFrequencyData(fbuf);

      // 저역 평균 (30~180Hz)
      const sr = ctx.sampleRate;
      const lo = hzToBin(30, sr, analyser.fftSize);
      const hi = hzToBin(180, sr, analyser.fftSize);
      let bassSum = 0;
      for (let i = lo; i <= hi; i++) bassSum += fbuf[i];
      const bassRaw = bassSum / (hi - lo + 1) / 255;

      // 스펙트럴 플럭스
      // 주파수 스펙트럼이 얼마나 빠르게 변하는지
      const prev = prevMagRef.current!;
      let flux = 0;
      for (let i = 0; i < fbuf.length; i++) {
        const diff = fbuf[i] / 255 - prev[i];
        if (diff > 0) flux += diff;
        prev[i] = fbuf[i] / 255;
      }

      // AGC(EMA)
      // 전체적인 음량 안정화
      const A = 0.2;
      emaRef.current.rms = (1 - A) * emaRef.current.rms + A * rmsRaw;
      emaRef.current.bass = (1 - A) * emaRef.current.bass + A * bassRaw;

      // 정규화
      const hist = fluxHistRef.current;
      hist.push(flux);
      if (hist.length > 50) hist.shift();
      const mean = hist.reduce((a, b) => a + b, 0) / hist.length;
      const std = Math.sqrt(hist.reduce((a, b) => a + (b - mean) ** 2, 0) / hist.length) || 0.0001;
      const threshold = mean + 1.5 * std;

      let onset = false;
      if (now > onsetCooldownRef.current && flux > threshold && bassRaw > 0.08) {
        onset = true;
        onsetCooldownRef.current = now + 120;
      }

      const rmsN = Math.min(1, emaRef.current.rms * 3.0);
      const bassN = Math.min(1, emaRef.current.bass * 1.8);

      setFeat({ ts: now, rms: rmsN, bass: bassN, onset });
      setTimeout(loop, frameMs);
    };

    loop();
    return () => {
      stop = true;
    };
  }, [analyser, fps]);

  return feat;
}
