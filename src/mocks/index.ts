import chaehyun1 from './audios/chaehyun1.wav';
import chaehyun2 from './audios/chaehyun2.wav';
import chaehyun3 from './audios/chaehyun3.wav';
import gabin1 from './audios/gabin1.wav';
import gabin2 from './audios/gabin2.wav';
import gabin3 from './audios/gabin3.wav';
import jiye1 from './audios/jiye1.wav';
import jiye2 from './audios/jiye2.wav';
import jiye3 from './audios/jiye3.wav';
import yuna1 from './audios/yuna1.wav';
import yuna2 from './audios/yuna2.wav';
import yuna3 from './audios/yuna3.wav';

export interface lanternsType {
  lantern_id: string;
  owner_name: string;
  emotion: string;
  is_current_lantern: boolean;
}

export interface lanternType {
  lantern_id: string;
  owner_name: string;
  images: string[];
  background_sounds: string[];
}

export const lanternsList: lanternsType[] = [
  { lantern_id: '김가빈-1435', owner_name: '김가빈', emotion: '', is_current_lantern: false },
  { lantern_id: '류지예-3292', owner_name: '류지예', emotion: '', is_current_lantern: false },
  { lantern_id: '박유나-4433', owner_name: '박유나', emotion: '', is_current_lantern: false },
  { lantern_id: '김채현-3897', owner_name: '김채현', emotion: '', is_current_lantern: true },
];

export const lanternsDetail: lanternType[] = [
  {
    lantern_id: '김가빈-1435',
    owner_name: '김가빈',
    images: [
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/gabin1.HEIC.heic',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/gabin2.JPG.jpg',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/gabin3.heic',
    ],
    background_sounds: [gabin1, gabin2, gabin3],
  },
  {
    lantern_id: '류지예-3292',
    owner_name: '류지예',
    images: [
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/jiye1.jpeg',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/jiye2.jpg',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/jiye3.jpeg',
    ],
    background_sounds: [jiye1, jiye2, jiye3],
  },
  {
    lantern_id: '박유나-4433',
    owner_name: '박유나',
    images: [
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/yuna1.png',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/yuna2.png',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/yuna3.png',
    ],
    background_sounds: [yuna1, yuna2, yuna3],
  },
  {
    lantern_id: '김채현-3897',
    owner_name: '김채현',
    images: [
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/chaehyun1.png',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/chaehyun2.png',
      'https://4co4co-memory-assets.s3.ap-northeast-2.amazonaws.com/panorama/chaehyun3.png',
    ],
    background_sounds: [chaehyun3, chaehyun1, chaehyun2],
  },
];
