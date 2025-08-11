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
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476637480-8c09f2db-2231-4acb-a1ea-2e9c64b1322d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160426Z&X-Amz-Expires=300&X-Amz-Signature=b93f2cf276cef6abfc2946a75a49779ede4e8b0df3fbd744897c75a37c739bed&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476636878-dde266ba-c149-4a18-a023-0af7dddd0c04.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160437Z&X-Amz-Expires=300&X-Amz-Signature=ea382392c1c63041b2ea258566e6c8487e4aff3f02fc88593bd6d01584dbc7e7&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476636407-a5fcd677-d153-406a-aa14-a15e91da4676.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160445Z&X-Amz-Expires=300&X-Amz-Signature=ced8104d8a925cdf7449eb9cd30316c4ffacddf5757a4c00a06ef9d08b732ab4&X-Amz-SignedHeaders=host',
    ],
    background_sounds: [gabin1, gabin2, gabin3],
  },
  {
    lantern_id: '류지예-3292',
    owner_name: '류지예',
    images: [
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476637872-08b86d2f-e67d-42c9-b00d-6d948dfd7504.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160355Z&X-Amz-Expires=300&X-Amz-Signature=2b098e647c4c8cb112585ec4bcfa82edb53cd5b0728c4df21d4d0bc3571125f4&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476637859-c6ee7702-d8e6-46e1-843b-0618b7072a52.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160406Z&X-Amz-Expires=300&X-Amz-Signature=2455ea19ba7306f52062fdaf379dc975fa9bb7fb5dd29917b54476cc5e15b352&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476637816-333a193a-86de-480e-8103-4def3f42634d.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160415Z&X-Amz-Expires=300&X-Amz-Signature=37877467138b0aa928af816eb965281204df4520f237b2cd665a580740341058&X-Amz-SignedHeaders=host',
    ],
    background_sounds: [jiye1, jiye2, jiye3],
  },
  {
    lantern_id: '박유나-4433',
    owner_name: '박유나',
    images: [
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476638418-a2586f68-48a2-4eb4-9838-787db0756840.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160119Z&X-Amz-Expires=300&X-Amz-Signature=72cdf69492c82624b830b0976c95bba0583bb263bd1c0664a62048efb88f049c&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476638365-994a01b3-abdd-4234-93f4-f81e51b016be.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160223Z&X-Amz-Expires=300&X-Amz-Signature=7596461b392e766911b345deb0f77cc8b59763fe5d11ccea6baa50457542c681&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476638335-038e113e-6d17-46bb-9385-19d7c099510a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160234Z&X-Amz-Expires=300&X-Amz-Signature=1b2926953801faf071da02119ef9684895dab9352eac8d1234a99dfd4a306677&X-Amz-SignedHeaders=host',
    ],
    background_sounds: [yuna1, yuna2, yuna3],
  },
  {
    lantern_id: '김채현-3897',
    owner_name: '김채현',
    images: [
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476635383-b3e89d94-3891-41ac-bd74-cd3190cdacb8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160342Z&X-Amz-Expires=300&X-Amz-Signature=9f6a134ce88fa058005327af51cb30348ee06d0c0888071af6134baa389fa171&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476642673-f209df23-9954-4c2d-9a5a-4a5688c03811.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160318Z&X-Amz-Expires=300&X-Amz-Signature=818c79ff008bed26ad54194f6a297255085f55131fd19ecd14291c1c7e0e06ad&X-Amz-SignedHeaders=host',
      'https://github-production-user-asset-6210df.s3.amazonaws.com/90364711/476643407-d27417ab-24a4-4db2-8289-fdedba61ada0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250811T160332Z&X-Amz-Expires=300&X-Amz-Signature=531a13a83f28c646599f038ce2195b39c05f39075a4cffbe5a6b998222581a93&X-Amz-SignedHeaders=host',
    ],
    background_sounds: [chaehyun3, chaehyun1, chaehyun2],
  },
];
