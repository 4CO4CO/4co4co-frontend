import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import { Rect } from '../components/common/lantern/constants';

// 풍등 내부 여부 함수
export const isInside = (pos: { x: number; y: number }, rect: Rect) => {
  return pos.x >= rect.x && pos.x <= rect.x + rect.width && pos.y >= rect.y && pos.y <= rect.y + rect.height;
};

// 주먹 확인
export const isFist = (marks: Keypoint[]) => {
  return (
    marks[8].y > marks[6].y && // 검지 접힘
    marks[12].y > marks[10].y && // 중지 접힘
    marks[16].y > marks[14].y && // 약지 접힘
    marks[20].y > marks[18].y // 소지 접힘
  );
};
