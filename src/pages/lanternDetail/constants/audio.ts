export const BAR_COUNT = 60;

// 로그 스케일 집계에 사용할 최소/최대 대역 (사람 귀 감각에 가깝게)
export const MIN_HZ = 80;
export const MAX_HZ = 12000;

// 시간 스무딩 계수
export const ATTACK = 1; // 올라갈 때 민감도 (높을수록 빨리)
export const RELEASE = 0.8; // 내려갈 때 민감도 (낮을수록 천천히)

// 저주파 → 고주파 순서
export const PALETTE = [
  'hsla(261, 78%, 77%, 1.00)', // 저역
  'hsl(200,60%,62%)',
  'hsla(0, 88%, 75%, 1.00)', // 고역
];
