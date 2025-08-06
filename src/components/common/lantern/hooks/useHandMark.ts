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

// 모듈 초기화 상태 추적을 위한 전역 변수
let isInitializing = false;
let detector: handPoseDetection.HandDetector | null = null;
let detectorPromise: Promise<handPoseDetection.HandDetector> | null = null;

// 위치 변화 임계값 (화면 너비 대비 1%)
const POSITION_THRESHOLD = 0.01;

// detector를 중복 없이 생성 또는 재사용
const getOrCreateDetector = async () => {
  if (detector) return detector;
  if (detectorPromise) return await detectorPromise;

  isInitializing = true;
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  detectorPromise = handPoseDetection.createDetector(model, {
    runtime: 'mediapipe',
    modelType: 'lite',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  });

  detector = await detectorPromise;
  isInitializing = false;
  return detector;
};

export const useHandMark = () => {
  const [handCenter, setHandCenter] = useState<{ x: number; y: number } | null>(null); // 추적된 손끝 좌표
  const [marks, setMarks] = useState<Keypoint[] | null>(null);
  const [handedness, setHandedness] = useState<'Left' | 'Right' | null>(null);
  // 이전 상태 저장용 ref
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const prevMarksRef = useRef<Keypoint[] | null>(null);
  const lastUpdateRef = useRef<number>(0); // 마지막 업데이트 시점 기록
  const frameIdRef = useRef<number>(0); // requestAnimationFrame id 저장

  useEffect(() => {
    let isMounted = true; // 언마운트 후 상태 업데이트 방지용

    const runHandDetection = async () => {
      // 이미 초기화 중이면 대기
      if (isInitializing) {
        setTimeout(runHandDetection, 300);
        return;
      }

      try {
        // 중복 초기화 방지
        if (typeof window !== 'undefined') {
          window.Module = undefined;
        }

        await getOrCreateDetector(); // detector 준비
      } catch (error) {
        console.error('손 감지기 초기화 오류:', error);
        return;
      }

      const video = document.querySelector('video') as HTMLVideoElement;

      // 손 감지 시작
      const detect = async (timestamp: number) => {
        if (!isMounted) return;

        // 100ms 간격으로 업데이트 제한 (약 10FPS)
        const lastUpdate = lastUpdateRef.current;
        if (timestamp - lastUpdate < 100) {
          frameIdRef.current = requestAnimationFrame(detect);
          return;
        }

        // video 준비 안 됐거나 모델 없으면 다음 프레임에서 재시도
        if (!video || video.readyState < 2 || !detector) {
          frameIdRef.current = requestAnimationFrame(detect);
          return;
        }

        try {
          // 손 인식 시도
          const hands = await detector.estimateHands(video);
          const hand = hands[0];

          if (hand && isMounted) {
            const tip = hand.keypoints.find((k) => k.name === 'middle_finger_mcp');
            if (tip) {
              // 위치 변화 체크
              const newPos = {
                x: (tip.x / video.videoWidth) * window.innerWidth,
                y: (tip.y / video.videoHeight) * window.innerHeight,
              };
              const isChanged =
                !prevPosRef.current ||
                Math.abs(newPos.x - prevPosRef.current.x) > video.width * POSITION_THRESHOLD ||
                Math.abs(newPos.y - prevPosRef.current.y) > video.height * POSITION_THRESHOLD;

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
          }
        } catch (e) {
          console.error('감지 중 오류:', e);
        }

        // 다음 프레임에서 재호출
        frameIdRef.current = requestAnimationFrame(detect);
      };

      // 첫 프레임 감지 시작
      frameIdRef.current = requestAnimationFrame(detect);
    };

    runHandDetection();

    return () => {
      isMounted = false;
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);

      // detector가 남아있을 경우에는 추가적으로 close() 호출
      if (detector) {
        const detectorWithClose = detector as handPoseDetection.HandDetector & {
          close?: () => void;
        };

        detectorWithClose.close?.();
        detector = null;
        detectorPromise = null;
      }
    };
  }, []);

  return { handCenter, marks, handedness };
};
