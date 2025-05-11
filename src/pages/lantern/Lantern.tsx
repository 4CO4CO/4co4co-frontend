import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HandTracker } from '../../components/lantern/HandTracker';
import { useHandMark } from '../../components/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/lantern/VideoFeed';
import { get } from '@/apis';

// 사각형
type Rect = { x: number; y: number; width: number; height: number };
type LanternWithRect = {
  lantern_id: string;
  owner_name: string;
  emotion: string;
  rect: Rect;
};

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
  const [hitLanternId, setHitLanternId] = useState<string | null>(null);
  const { handCenter, marks, handedness } = useHandMark();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const [lanterns, setLanterns] = useState<LanternWithRect[]>([]);

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

        const lanternsWithRect = response.data.map((lantern) => ({
          ...lantern,
          rect: {
            x: Math.random() * 600,
            y: Math.random() * 400,
            width: 100,
            height: 100,
          },
        }));
        setLanterns(lanternsWithRect);
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

    const fist = isFist(marks, handedness);
    if (!fist) {
      setHitLanternId(null);
      return;
    }

    for (const lantern of lanterns) {
      if (isInside(handCenter, lantern.rect)) {
        setHitLanternId(lantern.lantern_id);
        return;
      }
    }

    setHitLanternId(null);
  }, [handCenter, marks, handedness, lanterns]);

  return (
    <>
      <VideoFeed />
      <HandTracker onUpdate={setPos} />
      {lanterns.map((lantern) => (
        <div
          key={lantern.lantern_id}
          style={{
            position: 'absolute',
            top: lantern.rect.y,
            left: lantern.rect.x,
            width: hitLanternId === lantern.lantern_id ? lantern.rect.width * 1.3 : lantern.rect.width,
            height: hitLanternId === lantern.lantern_id ? lantern.rect.height * 1.3 : lantern.rect.height,
            backgroundColor: hitLanternId === lantern.lantern_id ? 'orange' : 'skyblue',
            borderRadius: 8,
            transition: 'all 0.2s ease',
          }}
        >
          {lantern.owner_name}
        </div>
      ))}

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
