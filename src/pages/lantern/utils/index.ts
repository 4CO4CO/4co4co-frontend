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

export const generateNonOverlappingPositions = (ids: string[], boxSize = 100) => {
  // 각 풍등의 위치 저장
  const placed: {
    [id: string]: { x: number; y: number; width: number; height: number };
  } = {};

  ids.forEach((id) => {
    let tries = 0;
    let position = {
      x: seededRandom(id + 'x') * 600,
      y: seededRandom(id + 'y') * 400,
      width: boxSize,
      height: boxSize,
    };

    while (Object.values(placed).some((other) => isRectOverlapping(position, other, 12))) {
      tries++;
      position = {
        x: seededRandom(id + 'x' + tries) * 600,
        y: seededRandom(id + 'y' + tries) * 400,
        width: boxSize,
        height: boxSize,
      };
      if (tries > 30) break; // 무한루프 방지
    }

    placed[id] = position;
  });

  return placed;
};
