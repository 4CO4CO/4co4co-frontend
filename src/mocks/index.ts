import chaehyun1 from './audios/chaehyun1.wav';
import chaehyun2 from './audios/chaehyun2.wav';
import chaehyun3 from './audios/chaehyun3.wav';
import jiye1 from './audios/jiye1.wav';
import jiye2 from './audios/jiye2.wav';
import jiye3 from './audios/jiye3.wav';
import kabeen1 from './audios/kabeen1.wav';
import kabeen2 from './audios/kabeen2.wav';
import kabeen3 from './audios/kabeen3.wav';
import youna1 from './audios/youna1.wav';
import youna2 from './audios/youna2.wav';
import youna3 from './audios/youna3.wav';

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

const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL;

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
      `${S3_BASE_URL}/panorama/kabeen1.jpg`,
      `${S3_BASE_URL}/panorama/kabeen2.jpg`,
      `${S3_BASE_URL}/panorama/kabeen3.jpg`,
    ],
    background_sounds: [kabeen1, kabeen2, kabeen3],
  },
  {
    lantern_id: '류지예-3292',
    owner_name: '류지예',
    images: [
      `${S3_BASE_URL}/panorama/jiye1.jpeg`,
      `${S3_BASE_URL}/panorama/jiye2.jpeg`,
      `${S3_BASE_URL}/panorama/jiye3.jpeg`,
    ],
    background_sounds: [jiye1, jiye2, jiye3],
  },
  {
    lantern_id: '박유나-4433',
    owner_name: '박유나',
    images: [
      `${S3_BASE_URL}/panorama/youna1.png`,
      `${S3_BASE_URL}/panorama/youna2.png`,
      `${S3_BASE_URL}/panorama/youna3.png`,
    ],
    background_sounds: [youna1, youna2, youna3],
  },
  {
    lantern_id: '김채현-3897',
    owner_name: '김채현',
    images: [
      `${S3_BASE_URL}/panorama/chaehyun1.jpg`,
      `${S3_BASE_URL}/panorama/chaehyun2.jpg`,
      `${S3_BASE_URL}/panorama/chaehyun3.jpg`,
    ],
    background_sounds: [chaehyun1, chaehyun2, chaehyun3],
  },
];