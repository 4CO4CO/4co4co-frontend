// seed 기준 랜덤값 생성
export const seededRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs((Math.sin(hash) * 10000) % 1); // 0~1 사이의 부동소수 난수 생성
};

// 사각형 a와 b가 겹쳐있는지 여부 판단
const isRectOverlapping = (
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
  padding = 10,
) => {
  return !(
    (
      a.x + a.width + padding < b.x || // 오른쪽 끝이 왼쪽보다 왼쪽이면 겹치지 않음
      a.x > b.x + b.width + padding || // 왼쪽이 오른쪽 끝보다 오른쪽이면 겹치지 않음
      a.y + a.height + padding < b.y || // 아래가 위보다 위에 있으면 겹치지 않음
      a.y > b.y + b.height + padding
    ) // 위가 아래보다 아래에 있으면 겹치지 않음
  );
};

export const generateNonOverlappingPositions = (
  ids: string[],
  boxSize = 100,
  viewportWidth: number,
  viewportHeight: number,
  excludeRect: DOMRect | null = null,
) => {
  const sortedIds = [...ids].sort();
  const padding = 12;

  const maxX = viewportWidth - boxSize - padding;
  const maxY = viewportHeight - boxSize - padding;
  // 각 풍등의 위치 저장
  const placed: {
    [id: string]: { x: number; y: number; width: number; height: number };
  } = {};

  sortedIds.forEach((id) => {
    let tries = 0;
    let position = {
      x: padding + seededRandom(id + 'x') * maxX,
      y: padding + seededRandom(id + 'y') * maxY,
      width: boxSize,
      height: boxSize,
    };

    while (
      Object.values(placed).some((other) => isRectOverlapping(position, other, 12)) ||
      (excludeRect && isRectOverlapping(position, excludeRect, 50))
    ) {
      tries++;
      position = {
        x: padding + seededRandom(id + 'x' + tries) * maxX,
        y: padding + seededRandom(id + 'y' + tries) * maxY,
        width: boxSize,
        height: boxSize,
      };
      if (tries > 30) break; // 무한루프 방지
    }

    placed[id] = position;
  });

  return placed;
};
