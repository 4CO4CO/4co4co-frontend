import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import { useEffect, useRef, useState } from 'react';
import '@mediapipe/hands';

// MediaPipe WASM 초기화 충돌 방지용 선언
declare global {
  interface Window {
    Module: unknown;
  }
}

// 타이머 타입 확장을 위한 인터페이스
interface ErrorWithTimestamp extends Error {
  timestamp?: number;
}

// 싱글톤으로 전역 관리
const detectorManager = {
  isInitializing: false,
  detector: null as handPoseDetection.HandDetector | null,
  detectorPromise: null as Promise<handPoseDetection.HandDetector> | null,
  referenceCount: 0,
  lastError: null as ErrorWithTimestamp | null,
  errorCount: 0,
  isDisposed: false,
};

// 위치 변화 임계값 (화면 너비 대비 1%)
const POSITION_THRESHOLD = 0.01;
const MAX_ERROR_COUNT = 5;
const ERROR_COOL_DOWN = 5000;

// 안전한 detector 정리
const safeDisposeDetector = async () => {
  if (detectorManager.detector && !detectorManager.isDisposed) {
    try {
      detectorManager.isDisposed = true;
      const detectorWithClose = detectorManager.detector as handPoseDetection.HandDetector & {
        close?: () => void;
        dispose?: () => Promise<void>;
      };

      // close 메서드가 있으면 호출
      if (typeof detectorWithClose.close === 'function') {
        detectorWithClose.close();
      }

      // dispose 메서드가 있으면 호출
      if (typeof detectorWithClose.dispose === 'function') {
        await detectorWithClose.dispose();
      }
    } catch (error) {
      console.warn('감지기 정리 중 오류:', error);
    } finally {
      detectorManager.detector = null;
      detectorManager.detectorPromise = null;
      detectorManager.isInitializing = false;
      detectorManager.isDisposed = false;
    }
  }
};

// detector를 중복 없이 생성 또는 재사용
const getOrCreateDetector = async (): Promise<handPoseDetection.HandDetector | null> => {
  // 에러가 너무 많이 발생하면 잠시 대기
  if (detectorManager.errorCount >= MAX_ERROR_COUNT) {
    const timeSinceLastError = Date.now() - (detectorManager.lastError?.timestamp || 0);
    if (timeSinceLastError < ERROR_COOL_DOWN) {
      console.warn('너무 많은 오류로 인해 감지기 생성을 일시 중단합니다');
      return null;
    } else {
      detectorManager.errorCount = 0;
    }
  }

  if (detectorManager.detector && !detectorManager.isDisposed) {
    return detectorManager.detector;
  }

  if (detectorManager.detectorPromise) {
    try {
      return await detectorManager.detectorPromise;
    } catch (error) {
      detectorManager.detectorPromise = null;
      throw error;
    }
  }

  // 초기화 중이면 잠시 대기 후 재시도
  if (detectorManager.isInitializing) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getOrCreateDetector();
  }

  try {
    detectorManager.isInitializing = true;

    // 기존 Module 정리
    if (typeof window !== 'undefined') {
      window.Module = undefined;
    }

    // 새로운 detector 생성
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    detectorManager.detectorPromise = handPoseDetection.createDetector(model, {
      runtime: 'mediapipe',
      modelType: 'lite',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
      maxHands: 1, // 최대 손 개수 제한
    });

    detectorManager.detector = await detectorManager.detectorPromise;
    detectorManager.isInitializing = false;
    detectorManager.isDisposed = false;

    console.info('MediaPipe 감지기 생성 완료');
    return detectorManager.detector;
  } catch (error) {
    console.error('감지기 생성 오류:', error);
    detectorManager.errorCount++;
    detectorManager.lastError = error as ErrorWithTimestamp;
    if (detectorManager.lastError) {
      detectorManager.lastError.timestamp = Date.now();
    }

    detectorManager.isInitializing = false;
    detectorManager.detectorPromise = null;

    // 심각한 오류인 경우 기존 detector도 정리
    if (error instanceof Error && error.message.includes('memory')) {
      await safeDisposeDetector();
    }

    return null;
  }
};

export const useHandMark = () => {
  const [handCenter, setHandCenter] = useState<{ x: number; y: number } | null>(null);
  const [marks, setMarks] = useState<Keypoint[] | null>(null);
  const [handedness, setHandedness] = useState<'Left' | 'Right' | null>(null);

  // 이전 상태 저장용 ref
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const prevMarksRef = useRef<Keypoint[] | null>(null);
  const lastUpdateRef = useRef<number>(0); // 마지막 업데이트 시점 기록
  const frameIdRef = useRef<number>(0); // requestAnimationFrame id 저장
  const errorCountRef = useRef<number>(0);
  const isDetectingRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true; // 언마운트 후 상태 업데이트 방지용
    const runHandDetection = async () => {
      // 이미 초기화 중이면 대기
      if (!isMounted) return;

      // 참조 카운트 증가
      detectorManager.referenceCount += 1;

      try {
        await getOrCreateDetector(); // detector 준비

        // detector 준비 대기
        const detector = await getOrCreateDetector();
        if (!detector || !isMounted) return;
      } catch (error) {
        console.error('손 감지기 초기화 오류:', error);
        return;
      }

      // 비디오 요소 찾기
      const getVideo = (): HTMLVideoElement | null => {
        const video = document.querySelector('video') as HTMLVideoElement;
        return video && video.readyState >= 2 && video.videoWidth > 0 ? video : null;
      };

      // 손 감지 시작
      const detect = async (timestamp: number) => {
        if (!isMounted || isDetectingRef.current) return;

        // 100ms 간격으로 업데이트 제한 (약 10FPS)
        const lastUpdate = lastUpdateRef.current;
        if (timestamp - lastUpdate < 100) {
          frameIdRef.current = requestAnimationFrame(detect);
          return;
        }

        // video 준비 안 됐거나 모델 없으면 다음 프레임에서 재시도
        const video = getVideo();
        if (!video || !detectorManager.detector || detectorManager.isDisposed) {
          frameIdRef.current = requestAnimationFrame(detect);
          return;
        }

        try {
          isDetectingRef.current = true;

          // 손 인식 시도 (타임아웃 추가)
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Detection timeout')), 1000);
          });

          const detectionPromise = detectorManager.detector!.estimateHands(video);
          const hands = await Promise.race([detectionPromise, timeoutPromise]);

          if (!isMounted) return;

          const hand = hands[0];
          if (hand) {
            // 손가락 끝 좌표 추출
            const tip = hand.keypoints.find((k) => k.name === 'middle_finger_mcp');
            if (tip) {
              // 사용자의 정면에 웹캠 위치하는 전시 시스템에 따라 좌우 반전 추가
              const flippedX = video.videoWidth - tip.x;
              const newPos = {
                x: (flippedX / video.videoWidth) * window.innerWidth,
                y: (tip.y / video.videoHeight) * window.innerHeight,
              };

              // 위치 변화 체크
              const isChanged =
                !prevPosRef.current ||
                Math.abs(newPos.x - prevPosRef.current.x) > window.innerWidth * POSITION_THRESHOLD ||
                Math.abs(newPos.y - prevPosRef.current.y) > window.innerHeight * POSITION_THRESHOLD;

              if (isChanged) {
                prevPosRef.current = newPos;
                setHandCenter(newPos);
              }
            }

            // 키포인트 변화 체크
            const isMarksChanged =
              !prevMarksRef.current || JSON.stringify(hand.keypoints) !== JSON.stringify(prevMarksRef.current);

            if (isMarksChanged) {
              prevMarksRef.current = hand.keypoints;
              setMarks(hand.keypoints);
              setHandedness(hand.handedness);
            }

            lastUpdateRef.current = timestamp;
            errorCountRef.current = 0; // 성공하면 에러 카운트 리셋
          } else {
            // 손이 감지되지 않은 경우
            if (handCenter || marks) {
              setHandCenter(null);
              setMarks(null);
              setHandedness(null);
              prevPosRef.current = null;
              prevMarksRef.current = null;
            }
          }
        } catch (error) {
          errorCountRef.current++;
          console.error('감지 중 오류:', error);

          // 연속된 오류가 많으면 detector 재생성
          if (errorCountRef.current >= 5) {
            console.warn('연속 오류로 인해 감지기를 재시작합니다');
            await safeDisposeDetector();
            errorCountRef.current = 0;

            // 잠시 대기 후 재시작
            setTimeout(() => {
              if (isMounted) {
                runHandDetection();
              }
            }, 2000);
            return;
          }
        } finally {
          isDetectingRef.current = false;
        }

        // 다음 프레임에서 재호출
        if (isMounted) {
          frameIdRef.current = requestAnimationFrame(detect);
        }
      };

      // 첫 프레임 감지 시작
      frameIdRef.current = requestAnimationFrame(detect);
    };

    runHandDetection();

    return () => {
      isMounted = false;

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = 0;
      }

      // 참조 카운트 감소
      detectorManager.referenceCount = Math.max(0, detectorManager.referenceCount - 1);

      // 마지막 참조가 해제되면 detector 정리
      if (detectorManager.referenceCount === 0) {
        setTimeout(() => {
          if (detectorManager.referenceCount === 0) {
            safeDisposeDetector();
          }
        }, 1000);
      }
    };
  }, [handCenter, marks]);

  return { handCenter, marks, handedness };
};
