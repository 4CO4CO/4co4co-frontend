import { useEffect, useRef, useState } from 'react';

interface UseAudioPlayerProps {
  audioUrls: string[];
  isUserInteracted: boolean;
  startIndex?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export const useAudioPlayer = ({
  audioUrls,
  isUserInteracted,
  startIndex = 0,
  fadeInDuration = 2,
  fadeOutDuration = 2,
}: UseAudioPlayerProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserFeatRef = useRef<AnalyserNode | null>(null); // 분석용
  const analyserVizRef = useRef<AnalyserNode | null>(null); // 시각화용

  // 타이머
  const fadeEndTimeoutRef = useRef<number | null>(null);
  const fadeOutStartTimeoutRef = useRef<number | null>(null);

  const isCleaningUpRef = useRef<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);

  // 사용자 인터럽트 플래그
  const userInterruptTickRef = useRef<number>(-1);

  // 중복 방지
  const globalTickRef = useRef<number>(0);
  const nextTick = () => ++globalTickRef.current;

  // AudioContext 초기화
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AC =
        window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) throw new Error('이 브라우저는 AudioContext를 지원하지 않습니다');
      audioContextRef.current = new AC();
    }
    return audioContextRef.current;
  };

  const clearAllTimers = () => {
    if (fadeEndTimeoutRef.current) {
      clearTimeout(fadeEndTimeoutRef.current);
      fadeEndTimeoutRef.current = null;
    }
    if (fadeOutStartTimeoutRef.current) {
      clearTimeout(fadeOutStartTimeoutRef.current);
      fadeOutStartTimeoutRef.current = null;
    }
  };

  const cleanup = () => {
    if (isCleaningUpRef.current) return;
    isCleaningUpRef.current = true;

    clearAllTimers();

    if (currentSourceRef.current) {
      currentSourceRef.current.onended = null;
      currentSourceRef.current.stop(0);
      currentSourceRef.current.disconnect();
      currentSourceRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    setTimeout(() => {
      isCleaningUpRef.current = false;
    }, 50);
  };

  // 페이드
  const fadeIn = (gainNode: GainNode, duration: number) => {
    const t = gainNode.context.currentTime;
    gainNode.gain.cancelScheduledValues(t);
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(1, t + duration);
  };

  const fadeOut = (gainNode: GainNode, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const t = gainNode.context.currentTime;
      const v = gainNode.gain.value;
      gainNode.gain.cancelScheduledValues(t);
      gainNode.gain.setValueAtTime(v, t);
      gainNode.gain.linearRampToValueAtTime(0, t + duration);
      fadeEndTimeoutRef.current = window.setTimeout(resolve, duration * 1000);
    });
  };

  // 다음 오디오 재생
  const playNext = () => {
    if (!audioUrls.length) return;
    setCurrentIndex((i) => (i + 1) % audioUrls.length);
  };

  // 오디오 재생
  const playAudio = async (audioUrl: string) => {
    try {
      const audioContext = getAudioContext();
      if (audioContext.state === 'suspended') await audioContext.resume();

      // 이전 곡 정리
      if (currentSourceRef.current && gainNodeRef.current && !isCleaningUpRef.current) {
        await fadeOut(gainNodeRef.current, fadeOutDuration);
        cleanup();
      } else if (!isCleaningUpRef.current) {
        cleanup();
      }

      // 새 버퍼 로드
      const resp = await fetch(audioUrl);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
      const buf = await resp.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(buf);

      // 그래프 준비
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      // Analyser 한 번만 생성
      if (!analyserFeatRef.current) {
        const af = audioContext.createAnalyser();
        af.fftSize = 512;
        af.smoothingTimeConstant = 0.6;
        analyserFeatRef.current = af;
      }
      if (!analyserVizRef.current) {
        const av = audioContext.createAnalyser();
        av.fftSize = 2048;
        av.smoothingTimeConstant = 0.85;
        analyserVizRef.current = av;
      }

      // 연결
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination); // 들리게
      gainNode.connect(analyserFeatRef.current); // 분석용 탭
      gainNode.connect(analyserVizRef.current); // 시각화용 탭

      currentSourceRef.current = source;
      gainNodeRef.current = gainNode;

      // 이번 트랙 시작 시점의 사용자 인터럽트
      const interruptTickAtStart = userInterruptTickRef.current;

      source.onended = () => {
        setIsPlaying(false);
        // 이번 트랙 시작 이후 인터럽트가 있었는지 여부만 확인
        const interruptedDuringThisTrack = userInterruptTickRef.current > interruptTickAtStart;
        cleanup();
        if (!interruptedDuringThisTrack) {
          // 다음 트랙 자동 재생
          setTimeout(() => {
            playNext();
          }, 50);
        }
      };

      setIsPlaying(true);
      source.start(0);
      fadeIn(gainNode, fadeInDuration);

      // 페이드 아웃
      const fadeOutStartTime = Math.max(0, audioBuffer.duration - fadeOutDuration - 0.5);
      fadeOutStartTimeoutRef.current = window.setTimeout(() => {
        if (gainNodeRef.current && currentSourceRef.current) {
          fadeOut(gainNodeRef.current, fadeOutDuration).catch(() => {});
        }
      }, fadeOutStartTime * 1000);
    } catch (e) {
      console.error('오디오 재생 실패:', e);
      setIsPlaying(false);
      playNext(); // 실패 시엔 자동으로 다음 시도
    }
  };

  // 사용자 스크롤 인터럽트 발생시 즉시 오디오 정리
  const stopImmediately = () => {
    clearAllTimers();
    if (currentSourceRef.current) {
      currentSourceRef.current.onended = null;
      currentSourceRef.current.stop(0);
      currentSourceRef.current.disconnect();
      currentSourceRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  // 외부 호출
  // 사용자 스크롤 우선 전환 (next/prev)
  const interruptAndSetIndex = (idx: number) => {
    userInterruptTickRef.current = nextTick();
    stopImmediately();
    if (audioUrls.length) {
      const L = audioUrls.length;
      const safe = ((idx % L) + L) % L;
      setCurrentIndex(safe);
    }
  };

  const nextNow = () => {
    if (!audioUrls.length) return;
    interruptAndSetIndex(currentIndex + 1);
  };
  const prevNow = () => {
    if (!audioUrls.length) return;
    interruptAndSetIndex(currentIndex - 1);
  };

  useEffect(() => {
    if (!audioUrls.length || !isUserInteracted) return;
    if (isUserInteracted) {
      playAudio(audioUrls[currentIndex]);
    }
  }, [currentIndex, audioUrls, isUserInteracted]);

  // 언마운트
  useEffect(() => {
    return () => {
      cleanup();
      if (analyserFeatRef.current) analyserFeatRef.current.disconnect();
      if (analyserVizRef.current) analyserVizRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return {
    currentIndex,
    isPlaying,
    currentTrack: audioUrls[currentIndex] || null,
    playNext,
    nextNow,
    prevNow,
    interruptAndSetIndex,
    totalTracks: audioUrls.length,
    analyserFeatures: analyserFeatRef.current,
    analyserViz: analyserVizRef.current,
  };
};
