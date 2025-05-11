import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HandTracker } from '../../components/lantern/HandTracker';
import { useHandMark } from '../../components/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/lantern/VideoFeed';
import { get } from '@/apis';

// 사각형 좌표
type Rect = { x: number; y: number; width: number; height: number };
const rect = { x: 200, y: 150, width: 100, height: 100 };

// 충돌 판정 함수
const isInside = (pos: { x: number; y: number }, rect: Rect) => {
  return pos.x >= rect.x && pos.x <= rect.x + rect.width && pos.y >= rect.y && pos.y <= rect.y + rect.height;
};

// 주먹 확인
const isFist = (marks: Keypoint[], handedness: 'Left' | 'Right') => {
  // 엄지 검출
  let thumbCrossed;
  if (handedness === 'Right') {
    thumbCrossed = marks[4].x > marks[8].x;
  } else {
    thumbCrossed = marks[4].x < marks[8].x;
  }

  return (
    marks[8].y > marks[6].y && // 검지 접힘
    marks[12].y > marks[10].y && // 중지 접힘
    marks[16].y > marks[14].y && // 약지 접힘
    marks[20].y > marks[18].y && // 소지 접힘
    thumbCrossed
  );
};

const Lantern = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [hit, setHit] = useState(false);
  const { handCenter, marks, handedness } = useHandMark();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const [currentLantern, setCurrentLantern] = useState<{
    lantern_id: string;
    owner_name: string;
    emotion: string;
  } | null>(null);

  useEffect(() => {
    const fetchLanterns = async () => {
      try {
        const response = await get<{
          status: string;
          message: string;
          data: {
            lantern_id: string;
            owner_name: string;
            emotion: string;
            is_current_lantern: boolean;
          }[];
        }>(`/lanterns?current_lantern_id=${currentLanternId}`);

        const found = response.data.find((item) => item.is_current_lantern);
        if (found) {
          setCurrentLantern(found);
        }
      } catch (error) {
        console.error(error);
        alert('다시 시도해주세요');
      }
    };

    fetchLanterns();
  }, [currentLanternId]);

  useEffect(() => {
    if (!handCenter || !marks || !handedness) return;

    setPos(handCenter);

    const entered = isInside(handCenter, rect);
    const fist = isFist(marks, handedness);

    if (entered && fist) {
      setHit(true);
    } else {
      setHit(false);
    }
  }, [handCenter, marks]);

  return (
    <>
      <VideoFeed />
      <HandTracker onUpdate={setPos} />
      {currentLantern && (
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 30,
            padding: '8px 16px',
            backgroundColor: 'yellow',
            borderRadius: 8,
            fontWeight: 'bold',
          }}
        >
          {currentLantern.owner_name}
        </div>
      )}
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

export default Lantern;
