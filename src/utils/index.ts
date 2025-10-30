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

// uuid 생성
export const makeUUID = (): string => {
  const g = globalThis;

  // 최신 브라우저
  if (g.crypto?.randomUUID) return g.crypto.randomUUID();

  // getRandomValues가 있으면 RFC4122 v4 형식으로 생성
  const crypto = g.crypto;
  if (crypto?.getRandomValues) {
    const b = new Uint8Array(16);
    crypto.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40; // version 4
    b[8] = (b[8] & 0x3f) | 0x80; // variant
    const hex = [...b].map((x) => x.toString(16).padStart(2, '0'));
    return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex
      .slice(8, 10)
      .join('')}-${hex.slice(10).join('')}`;
  }

  // 완전 폴백
  return `sid-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};
