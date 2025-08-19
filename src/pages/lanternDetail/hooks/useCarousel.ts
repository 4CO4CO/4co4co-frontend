import { useEffect, useMemo, useRef, useState } from 'react';
import { useAudioPlayer } from './useAudioPlayer';
import { COPIES, COOLDOWN_MS, DELTA_TRIGGER, MIDDLE_BLOCK } from '../constants/carousel';
import { centerToLeft, clampMod, waitUntilSettled } from '../utils';

interface UseCarouselProps {
  audioPlayer: ReturnType<typeof useAudioPlayer>;
  images: string[];
}

export const useCarousel = ({ audioPlayer, images: realImages }: UseCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const skipCooldownRef = useRef(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [lastDirectionRef] = useState<{ dir: 1 | -1 | 0 }>({ dir: 0 });

  const L = realImages.length;

  const carouselImages = useMemo(() => {
    if (!L) return [];
    return Array.from({ length: COPIES }).flatMap(() => realImages);
  }, [realImages, L]);

  const kMiddle = (idx: number) => idx + 1 + L * MIDDLE_BLOCK;

  // 현재 스크롤 위치 기준, 같은 idx에 대한 가장 가까운 슬롯
  const nearestDirectionalSlot = (container: HTMLDivElement, idx: number, dir: 1 | -1) => {
    const kArr = Array.from({ length: COPIES }).map((_, i) => idx + 1 + i * L);
    const x = container.scrollLeft;
    const candidates = kArr
      .map((k) => ({ k, left: centerToLeft(container, k) }))
      .filter(({ left }) => (dir === 1 ? left > x + 1 : left < x - 1))
      .sort((a, b) => (dir === 1 ? a.left - b.left : b.left - a.left));
    if (!candidates.length) {
      return kArr
        .map((k) => ({ k, left: centerToLeft(container, k), d: Math.abs(centerToLeft(container, k) - x) }))
        .sort((a, b) => a.d - b.d)[0].k;
    }
    return candidates[0].k;
  };

  // 사용자 스크롤
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !L) return;

    const onScroll = () => {
      if (isProgrammaticRef.current) return;
      const prev = lastScrollLeftRef.current;
      const curr = container.scrollLeft;
      const delta = curr - prev;
      lastScrollLeftRef.current = curr;

      if (skipCooldownRef.current) return;
      if (Math.abs(delta) < DELTA_TRIGGER) return;

      // 방향 결정
      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      lastDirectionRef.dir = dir;

      // 사용자 스크롤 시 오디오 즉시 전환
      if (dir === 1) {
        audioPlayer.nextNow();
      } else {
        audioPlayer.prevNow();
      }

      skipCooldownRef.current = true;
      window.setTimeout(() => (skipCooldownRef.current = false), COOLDOWN_MS);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [L, audioPlayer, lastDirectionRef]);

  // currentIndex 변경
  // 이동(smooth) → 정착 → 가운데 블록으로 이동(auto)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !L) return;

    const idx = clampMod(audioPlayer.currentIndex, L);

    // 최초 진입
    if (isFirstRender) {
      const left = centerToLeft(container, kMiddle(idx));
      isProgrammaticRef.current = true;
      container.scrollTo({ left, behavior: 'auto' });
      setTimeout(() => {
        isProgrammaticRef.current = false;
        lastScrollLeftRef.current = container.scrollLeft;
      }, 0);
      setIsFirstRender(false);
      return;
    }

    // 가장 가까운 슬롯으로 이동
    const dir = lastDirectionRef.dir || 1;
    const visibleK = nearestDirectionalSlot(container, idx, dir);
    const visibleLeft = centerToLeft(container, visibleK);

    isProgrammaticRef.current = true;
    container.scrollTo({ left: visibleLeft, behavior: 'smooth' });

    // 정착 후 가운데 블록으로 이동
    (async () => {
      await waitUntilSettled(() => container.scrollLeft, visibleLeft, 1, 3);
      const middleLeft = centerToLeft(container, kMiddle(idx));
      container.scrollTo({ left: middleLeft, behavior: 'auto' });
      const finalize = () => {
        isProgrammaticRef.current = false;
        lastScrollLeftRef.current = container.scrollLeft;
        lastDirectionRef.dir = 0;
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(finalize);
      });
    })();
  }, [audioPlayer.currentIndex, L, isFirstRender, lastDirectionRef]);

  return { scrollContainerRef, carouselImages };
};
