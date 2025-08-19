export const makeStops = (palette: string[]) =>
  palette.map((color, i, arr) => ({ t: arr.length === 1 ? 0 : i / (arr.length - 1), color }));

// 부드러운 그라데이션 전환
export const buildSegmentGradient = (ctx: CanvasRenderingContext2D, width: number, palette: string[]) => {
  const g = ctx.createLinearGradient(0, 0, width, 0);
  const stops = makeStops(palette);
  stops.forEach((s) => g.addColorStop(s.t, s.color));
  return g;
};

// 여러 개의 점을 연결하여 물결 모양의 파형 생성
export const pathCatmullRom = (ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[]) => {
  if (pts.length < 2) return;
  ctx.moveTo(pts[0].x, pts[0].y);
  // 각 점과 다음 점 사이의 곡선
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]; // 이전 점
    const p1 = pts[i]; // 현재 점
    const p2 = pts[i + 1]; // 다음 점
    const p3 = pts[i + 2] ?? p2; // 다음 다음 점

    // 제어점 계산 (Catmull-Rom)
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    // 3차 베지어 곡선으로 변환
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
};

export const clampMod = (i: number, L: number) => {
  return ((i % L) + L) % L;
};

type WaitOpts = { eps?: number; stableFrames?: number; signal?: AbortSignal; timeoutMs?: number };

export const waitUntilSettled = (getter: () => number, target: number, opts: WaitOpts = {}) => {
  const { eps = 1, stableFrames = 3, signal, timeoutMs = 3000 } = opts;

  return new Promise<void>((resolve, reject) => {
    let ok = 0;
    let rafId = 0;
    let toId: number | null = null;

    const cancel = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (toId != null) clearTimeout(toId);
    };

    const onAbort = () => {
      cancel();
      reject(new DOMException('Aborted', 'AbortError'));
    };

    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener('abort', onAbort, { once: true });
    }

    if (timeoutMs) {
      toId = window.setTimeout(() => {
        cancel();
        resolve();
      }, timeoutMs);
    }

    const loop = () => {
      if (signal?.aborted) return;
      const d = Math.abs(getter() - target);
      ok = d < eps ? ok + 1 : 0;
      if (ok >= stableFrames) {
        cancel();
        return resolve();
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
  });
};

export const centerToLeft = (container: HTMLDivElement, k: number) => {
  const imageWidth = container.clientWidth / 3;
  return (k - 1) * imageWidth - (container.clientWidth - imageWidth) / 2;
};
