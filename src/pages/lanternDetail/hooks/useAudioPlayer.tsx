import { useEffect, useRef, useState } from 'react';

interface UseAudioPlayerProps {
  audioUrls: string[];
  isUserInteracted: boolean;
  startIndex?: number;
}

export const useAudioPlayer = ({
  audioUrls,
  isUserInteracted,
  startIndex = 0
}: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);

  // 오디오 정리 함수
  const cleanupAudio = (audio: HTMLAudioElement) => {
    audio.pause();
    audio.src = '';
    audio.onended = null;
    audio.onerror = null;
    audio.onplay = null;
    audio.onpause = null;
  };

  // 다음 곡으로 넘어가기
  const playNext = () => {
    const nextIndex = (currentIndex + 1) % audioUrls.length;
    setCurrentIndex(nextIndex);
  };

  // 이전 곡으로 넘어가기
  const playPrevious = () => {
    const prevIndex = currentIndex === 0 ? audioUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  // 특정 인덱스 재생
  const playTrack = (index: number) => {
    if (index >= 0 && index < audioUrls.length) {
      setCurrentIndex(index);
    }
  };

  // 재생/일시정지 토글
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // 음악 재생 메인 로직
  useEffect(() => {
    if (!audioUrls.length || !isUserInteracted) return;

    let currentAudio: HTMLAudioElement | null = null;

    const playMusic = async () => {
      try {
        // 이전 오디오 정리
        if (currentAudio) {
          cleanupAudio(currentAudio);
          currentAudio = null;
        }

        if (audioRef.current) {
          cleanupAudio(audioRef.current);
          audioRef.current = null;
        }

        // 새 오디오 생성
        const audio = new Audio(audioUrls[currentIndex]);
        currentAudio = audio;
        audioRef.current = audio;

        // 이벤트 핸들러 설정
        audio.onended = () => {
          setIsPlaying(false);
          playNext();
        };

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);

        audio.onerror = () => {
          console.warn(`음악 파일 로드 실패: ${audioUrls[currentIndex]}`);
          setIsPlaying(false);
          playNext();
        };

        await audio.play();
        // console.log(`음악 재생 중: ${currentIndex + 1}/${audioUrls.length}`);
      } catch (error) {
        console.warn('음악 재생 실패, 다음 곡 시도:', error);
        setIsPlaying(false);
        playNext();
      }
    };

    playMusic();

    // 정리 함수
    return () => {
      if (currentAudio) {
        cleanupAudio(currentAudio);
        currentAudio = null;
      }
      if (audioRef.current) {
        cleanupAudio(audioRef.current);
        audioRef.current = null;
      }
      setIsPlaying(false);
    };
  }, [currentIndex, audioUrls, isUserInteracted]);

  return {
    currentIndex,
    isPlaying,
    currentTrack: audioUrls[currentIndex] || null,
    playNext,
    playPrevious,
    playTrack,
    togglePlay,
    totalTracks: audioUrls.length
  };
};