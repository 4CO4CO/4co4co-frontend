import { LanternData } from "@/components/lantern/constants";

export const createMockData = (lanternId: string): LanternData => ({
  lantern_id: lanternId,
  owner_name: "테스트 사용자",
  images: [
    "https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/mock1.png",
    "https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/mock2.png",
    "https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/mock3.png",
  ],
  background_sounds: [
    "https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/music/mock1.wav",
    "https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/music/mock2.wav",
    "https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/music/mock3.wav",
  ],
});