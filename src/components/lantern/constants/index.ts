// 사각형
export type Rect = { x: number; y: number; width: number; height: number };

export type LanternWithRect = {
  lantern_id: string;
  owner_name: string;
  emotion: string;
  rect: Rect;
};

// 풍등 상세 데이터
export type LanternData = {
  lantern_id: string;
  owner_name: string;
  images: string[];
  background_sounds: string[];
};
