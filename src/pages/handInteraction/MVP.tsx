import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import { useEffect, useState } from 'react';
import { HandTracker } from '../../components/hand/HandTracker';
import { useHandMark } from '../../components/hand/hooks/useHandMark';
import { VideoFeed } from '../../components/hand/VideoFeed';

// 사각형 좌표
type Rect = { x: number; y: number; width: number; height: number };
const rect = { x: 200, y: 150, width: 100, height: 100 };

// 충돌 판정 함수
const isInside = (pos: { x: number; y: number }, rect: Rect) => {
  return pos.x >= rect.x && pos.x <= rect.x + rect.width && pos.y >= rect.y && pos.y <= rect.y + rect.height;
};

// 네 손가락이 모두 접혔는지 확인 (주먹 제스처)
const isFist = (marks: Keypoint[]) => {
  // 엄지 검출 추가 (엄지가 검지 아래로 위치)
  const thumbCrossed = marks[4].x < marks[8].x;

  return (
    marks[8].y > marks[6].y && // 검지 접힘
    marks[12].y > marks[10].y && // 중지 접힘
    marks[16].y > marks[14].y && // 약지 접힘
    marks[20].y > marks[18].y && // 소지 접힘
    thumbCrossed
  );
};

const MVP = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [hit, setHit] = useState(false);
  const { indexFingerTip, marks } = useHandMark();

  useEffect(() => {
    if (!indexFingerTip || !marks) return;

    setPos(indexFingerTip);

    const entered = isInside(indexFingerTip, rect);
    const fist = isFist(marks);

    if (entered && fist) {
      setHit(true);
    } else {
      setHit(false);
    }
  }, [indexFingerTip, marks]);

  return (
    <>
      <VideoFeed />
      <HandTracker onUpdate={setPos} />
      <div
        style={{
          position: 'absolute',
          top: rect.y,
          left: rect.x,
          width: hit ? rect.width * 1.3 : rect.width,
          height: hit ? rect.height * 1.3 : rect.height,
          backgroundColor: hit ? 'orange' : 'skyblue',
          transition: 'all 0.2s ease',
        }}
      />
      {pos && (
        <div
          style={{
            position: 'absolute',
            top: pos.y,
            left: pos.x,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'lime',
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

export default MVP;
