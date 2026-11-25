
export interface SpacePlace {
  id: string;
  name: string;
  description: string;
  href: string;
  x: number;
  y: number;
  type: string;
}

export const places: SpacePlace[] = [
  {
    id: 'home',
    name: 'HOME STATION',
    description: '返回深空首页',
    href: '/',
    x: 18,
    y: 25,
    type: 'HOME'
  },
  {
    id: 'cabin',
    name: 'MY CABIN',
    description: '探索我的太空卧室',
    href: '/cabin/',
    x: 75,
    y: 19,
    type: 'PERSONAL'
  },
  {
    id: 'archive',
    name: 'ARCHIVE MOON',
    description: '收藏知识与研究记录',
    href: '/archive/',
    x: 80,
    y: 69,
    type: 'KNOWLEDGE'
  },
  {
    id: 'solar',
    name: 'SOL SYSTEM',
    description: '探索太阳系八大行星',
    href: '/solar-system/',
    x: 48,
    y: 48,
    type: 'SCIENCE'
  },
  {
    id: 'memories',
    name: 'MEMORY PLANET',
    description: '记录珍贵的图片与回忆',
    href: '/memories/',
    x: 20,
    y: 76,
    type: 'GALLERY'
  },
  {
    id: 'observatory',
    name: 'OBSERVATORY',
    description: '观察深空与天体',
    href: '/observatory/',
    x: 51,
    y: 80,
    type: 'OBSERVATION'
  }
];
