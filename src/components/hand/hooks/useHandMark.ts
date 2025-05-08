import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import { useEffect, useRef, useState } from 'react';
import '@mediapipe/hands';

declare global {
  interface Window {
    Module: unknown;
  }
}

// 모듈 초기화 상태 추적을 위한 전역 변수
let isInitializing = false;
let detector: handPoseDetection.HandDetector | null = null;

// 위치 변화 임계값 (화면 너비 대비 1%)
const POSITION_THRESHOLD = 0.01;

export const useHandMark = () => {
  const [indexFingerTip, setIndexFingerTip] = useState<{ x: number; y: number } | null>(null); // 추적된 손끝 좌표
  const [marks, setMarks] = useState<Keypoint[] | null>(null);
  // 이전 상태 저장용 ref
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const prevMarksRef = useRef<Keypoint[] | null>(null);

  useEffect(() => {
    let isMounted = true; // 언마운트 후 상태 업데이트
    let frameId: number;
    let lastUpdate = 0;

    const runHandDetection = async () => {
      // 이미 초기화 중이면 대기
      if (isInitializing) {
        setTimeout(runHandDetection, 300);
        return;
      }

      // 감지기가 없으면 초기화
      if (!detector) {
        try {
          isInitializing = true;

          // WASM 초기화 충돌 방지
          if (typeof window !== 'undefined') {
            window.Module = undefined;
          }
          const model = handPoseDetection.SupportedModels.MediaPipeHands;
          detector = await handPoseDetection.createDetector(model, {
            runtime: 'mediapipe',
            modelType: 'lite',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
          });
        } catch (error) {
          console.error('손 감지기 초기화 오류:', error);
        } finally {
          isInitializing = false;
        }
      }
      const video = document.querySelector('video') as HTMLVideoElement;

      // 손 감지 시작
      const detect = async (timestamp: number) => {
        if (!isMounted) return;

        // 30ms 간격으로 업데이트 제한 (약 30FPS)
        if (timestamp - lastUpdate < 30) {
          frameId = requestAnimationFrame(detect);
          return;
        }

        // video 준비 안 됐거나 모델 없으면 다음 프레임에서 재시도
        if (!video || video.readyState < 2 || !detector) {
          frameId = requestAnimationFrame(detect);
          return;
        }

        try {
          // 손 인식 시도
          const hands = await detector.estimateHands(video);
          const hand = hands[0];

          if (hand && isMounted) {
            const tip = hand.keypoints.find((k) => k.name === 'index_finger_tip');
            if (tip) {
              // 위치 변화 체크
              const newPos = { x: tip.x, y: tip.y };
              const isChanged =
                !prevPosRef.current ||
                Math.abs(newPos.x - prevPosRef.current.x) > video.width * POSITION_THRESHOLD ||
                Math.abs(newPos.y - prevPosRef.current.y) > video.height * POSITION_THRESHOLD;

              if (isChanged) {
                prevPosRef.current = newPos;
                setIndexFingerTip(newPos);
                lastUpdate = timestamp;
              }
            }

            // 키포인트 변화 체크
            const isMarksChanged =
              !prevMarksRef.current || JSON.stringify(hand.keypoints) !== JSON.stringify(prevMarksRef.current);

            if (isMarksChanged) {
              prevMarksRef.current = hand.keypoints;
              setMarks(hand.keypoints);
            }
          }
        } catch (e) {
          console.error('감지 중 오류:', e);
        }

        frameId = requestAnimationFrame(detect);
      };

      frameId = requestAnimationFrame(detect);
    };

    runHandDetection();

    return () => {
      isMounted = false;
      cancelAnimationFrame(frameId);
    };
  }, []);

  return { indexFingerTip, marks };
};
