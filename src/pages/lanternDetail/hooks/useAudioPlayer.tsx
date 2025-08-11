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
  const analyserRef = useRef<AnalyserNode | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);
  const isCleaningUpRef = useRef<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);

  // AudioContext 초기화
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) {
        const errorMsg = '이 브라우저는 AudioContext를 지원하지 않습니다';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }

      audioContextRef.current = new AudioContextClass();
    }
    return audioContextRef.current;
  };

  // 오디오 리소스 정리 (메모리 누수 방지)
  const cleanup = () => {
    if (isCleaningUpRef.current) {
      return;
    }

    isCleaningUpRef.current = true;

    // 페이드 타이머 정리
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    // 현재 재생 중인 소스가 있다면 정지 및 해제
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
        currentSourceRef.current.disconnect();
      } catch (error) {
        console.warn('오디오 소스 정지 실패:', error instanceof Error ? error.message : String(error));
      }
      currentSourceRef.current = null;
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    // 정리 완료 후 플래그 리셋
    setTimeout(() => {
      isCleaningUpRef.current = false;
    }, 100);
  };

  // 페이드인 효과 (0에서 1까지 부드럽게)
  const fadeIn = (gainNode: GainNode, duration: number) => {
    const currentTime = gainNode.context.currentTime;
    gainNode.gain.cancelScheduledValues(currentTime);
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(1, currentTime + duration);
  };

  // 페이드아웃 효과 (1에서 0까지 부드럽게)
  const fadeOut = (gainNode: GainNode, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const currentTime = gainNode.context.currentTime;
      const currentVolume = gainNode.gain.value;

      gainNode.gain.cancelScheduledValues(currentTime);
      gainNode.gain.setValueAtTime(currentVolume, currentTime);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);

      fadeTimeoutRef.current = window.setTimeout(() => {
        resolve();
      }, duration * 1000);
    });
  };

  // 다음 곡으로 넘어가기
  const playNext = () => {
    const nextIndex = (currentIndex + 1) % audioUrls.length;
    setCurrentIndex(nextIndex);
  };

  // 메인 오디오 재생 함수
  const playAudio = async (audioUrl: string) => {
    try {
      const audioContext = getAudioContext();

      // 브라우저 정책으로 인한 일시정지 상태 해제
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // 이전 곡이 재생 중이면 페이드아웃 후 정리
      if (currentSourceRef.current && gainNodeRef.current && !isCleaningUpRef.current) {
        await fadeOut(gainNodeRef.current, fadeOutDuration);
        cleanup();
      } else {
        // 정리 중이 아닐 때만 cleanup 호출
        if (!isCleaningUpRef.current) {
          cleanup();
        }
      }

      // 새로운 오디오 파일 로드 및 디코딩
      const response = await fetch(audioUrl);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // 오디오 그래프 생성: Source → GainNode → AnalyserNode → Destination
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      if (!analyserRef.current) {
        analyserRef.current = audioContext.createAnalyser();
        analyserRef.current.fftSize = 256;
      }

      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(analyserRef.current);
      analyserRef.current.connect(audioContext.destination);

      currentSourceRef.current = source;
      gainNodeRef.current = gainNode;

      // 곡이 자연스럽게 끝나면 다음 곡으로
      source.onended = () => {
        setIsPlaying(false);
        cleanup();
        // race condition 방지용 지연
        setTimeout(() => {
          playNext();
        }, 50);
      };

      // 재생 시작과 동시에 페이드인 효과 적용
      setIsPlaying(true);
      source.start(0);
      fadeIn(gainNode, fadeInDuration);

      // 곡이 끝나기 전에 미리 페이드아웃 시작
      const fadeOutStartTime = Math.max(0, audioBuffer.duration - fadeOutDuration - 0.5);

      setTimeout(() => {
        if (gainNodeRef.current && currentSourceRef.current) {
          fadeOut(gainNodeRef.current, fadeOutDuration).catch(() => {
            console.error('페이드아웃 중 오류 발생');
          });
        }
      }, fadeOutStartTime * 1000);
    } catch (error) {
      console.error('오디오 재생 실패:', error instanceof Error ? error.message : String(error));
      setIsPlaying(false);
      playNext(); // 실패하면 다음 곡 시도
    }
  };

  // 사용자가 상호작용하면 음악 재생 시작
  useEffect(() => {
    if (!audioUrls.length || !isUserInteracted) {
      return;
    }

    const audioUrl = audioUrls[currentIndex];
    playAudio(audioUrl);
  }, [currentIndex, audioUrls, isUserInteracted]);

  useEffect(() => {
    return () => {
      cleanup();
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    currentIndex,
    isPlaying,
    currentTrack: audioUrls[currentIndex] || null,
    playNext,
    totalTracks: audioUrls.length,
    analyser: analyserRef.current,
  };
};
