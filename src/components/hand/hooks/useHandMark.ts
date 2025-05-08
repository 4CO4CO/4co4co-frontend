import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { useEffect, useState } from 'react';
import '@mediapipe/hands';

export const useHandMark = () => {
  const [indexFingerTip, setIndexFingerTip] = useState<{ x: number; y: number } | null>(null); // 추적된 손끝 좌표

  useEffect(() => {
    let detector: handPoseDetection.HandDetector; // 손 추적 모델 인스턴스
    let isMounted = true; // 언마운트 후 상태 업데이트 방지

    const setupDetector = async () => {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      detector = await handPoseDetection.createDetector(model, {
        runtime: 'mediapipe',
        modelType: 'lite',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
      });

      const video = document.querySelector('video') as HTMLVideoElement;

      // 손 추적
      const detect = async () => {
        // video 준비 안 됐거나 모델 없으면 다음 프레임에서 재시도
        if (!video || video.readyState < 2 || !detector) {
          requestAnimationFrame(detect);
          return;
        }

        // 손 인식 시도
        const hands = await detector.estimateHands(video);

        // 검지 끝 좌표 추출
        const point = hands[0]?.keypoints.find((k) => k.name === 'index_finger_tip');
        if (point && isMounted) {
          setIndexFingerTip({ x: point.x, y: point.y });
        }

        requestAnimationFrame(detect); // 다음 프레임 계속 추적
      };

      detect();
    };

    setupDetector();

    return () => {
      isMounted = false;
    };
  }, []);

  return { indexFingerTip };
};
