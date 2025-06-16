import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { useHandMark } from '../../components/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/lantern/VideoFeed';
import { get } from '@/apis';
import { LanternWithRect } from '@/components/lantern/constants';
import { useLanternHit } from '@/components/lantern/hooks/useLanternHit';

const Lantern = () => {
  const { handCenter } = useHandMark();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const [lanterns, setLanterns] = useState<LanternWithRect[]>([]);
  const { hitLanternId } = useLanternHit(lanterns);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentLanternId) {
      navigate('/');
      return;
    }

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

        // 5 * 4 그리드 좌표 계산
        const gridCols = 5;
        const gridRows = 4;
        const gap = 20;
        const boxSize = 100;

        const gridPositions = Array.from({ length: gridCols * gridRows }, (_, index) => {
          const row = Math.floor(index / gridCols);
          const col = index % gridCols;
          return {
            x: col * (boxSize + gap),
            y: row * (boxSize + gap),
          };
        });

        // 랜턴 데이터의 개수에 맞게 그리드 위치를 랜덤하게 섞고 제한
        const shuffledPositions = [...gridPositions].sort(() => Math.random() - 0.5);
        const limitedPositions = shuffledPositions.slice(0, response.data.length);

        // 랜덤 위치 할당
        const lanternsWithRect = response.data.map((lantern, index) => ({
          ...lantern,
          rect: {
            ...limitedPositions[index],
            width: boxSize,
            height: boxSize,
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
    if (hitLanternId) {
      navigate(`/lanterns/${hitLanternId}?currentLanternId=${currentLanternId}`);
    }
  }, [hitLanternId]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <VideoFeed />
      {lanterns.map((lantern) => (
        <div
          key={lantern.lantern_id}
          className={styles.lanternBox}
          style={{
            position: 'absolute',
            top: lantern.rect.y,
            left: lantern.rect.x,
            width: lantern.rect.width,
            height: lantern.rect.height,
          }}
        >
          {lantern.owner_name}
        </div>
      ))}
      {handCenter && (
        <div
          className={styles.handPointer}
          style={{ top: handCenter.y, left: handCenter.x }}
        />
      )}
    </div>
  );
};

export default Lantern;
