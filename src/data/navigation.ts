export const destinations = [
  { id:'home', name:'首页', en:'HOME', href:'/', description:'返回像素宇宙的起点', image:'/media/images/planets/kenney-generic/planet00.png' },
  { id:'galaxy', name:'星系图谱', en:'GALAXY', href:'/galaxy/', description:'探索星系、星云与星际地图', image:'/media/images/planets/kenney-generic/planet01.png' },
  { id:'cabin', name:'个人舱', en:'CABIN', href:'/cabin/', description:'进入个人空间与工作台', image:'/media/images/planets/kenney-generic/planet03.png' },
  { id:'archive', name:'知识档案', en:'ARCHIVE', href:'/archive/', description:'搜索算法、科研与学习笔记', image:'/media/images/planets/kenney-generic/planet05.png' },
  { id:'solar', name:'太阳系', en:'SOLAR SYSTEM', href:'/solar-system/', description:'认识太阳系行星', image:'/media/images/planets/kenney-generic/planet07.png' },
  { id:'memories', name:'记忆星球', en:'MEMORIES', href:'/memories/', description:'浏览个人收藏与影像', image:'/media/images/planets/kenney-generic/planet02.png' },
  { id:'observatory', name:'深空观测', en:'OBSERVATORY', href:'/observatory/', description:'探索天文影像与观测资料', image:'/media/images/planets/kenney-generic/planet08.png' },
  { id:'hangar', name:'星际机库', en:'HANGAR', href:'/hangar/', description:'选择飞船，准备航行', image:'/media/images/hangar/scout.png' },
];
export const activities = [
  {name:'航行训练', en:'VOYAGE', href:'/hangar/voyage/', description:'操控飞船、收集信标', image:'/media/images/hangar/comet.png'},
  {name:'个人工作台', en:'WORKBENCH', href:'/cabin/workbench/', description:'管理本地任务与学习进度', image:'/media/images/cabin/personal-quarters.png'},
  {name:'宇宙影像图鉴', en:'COLLECTION', href:'/memories/collection/', description:'浏览十五张宇宙主题图片', image:'/media/images/collections/pixel-space.jpg'},
  {name:'宇宙电台', en:'COSMIC RADIO', href:'/radio/', description:'发送深空讯息，阅读公开留言', image:'/media/images/planets/kenney-generic/planet04.png'},
  {name:'星辰来签', en:'STAR ORACLE', href:'/oracle/', description:'领取今日星签与小挑战', image:'/media/images/planets/kenney-generic/planet06.png'},
  {name:'星际友邻', en:'STAR NEIGHBORS', href:'/friends/', description:'探索朋友们的网站', image:'/media/images/planets/kenney-generic/planet09.png'},
];
export const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
export const isCurrent = (path: string, href: string) => normalizePath(path) === normalizePath(href);
export const isSection = (path: string, href: string) => isCurrent(path, href) || (href !== '/' && normalizePath(path).startsWith(normalizePath(href)+'/'));
