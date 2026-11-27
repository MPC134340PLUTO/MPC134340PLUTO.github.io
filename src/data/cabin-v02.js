const group = (label, code, path, names, details = [], optional = false) => ({
  label,
  path,
  options: names.map((name, index) => ({
    id: code + '-' + String(index + 1).padStart(2, '0'),
    name,
    detail: details[index] || '',
  })).concat(optional ? [{ id: null, name: '留空', detail: '清空此处展示。' }] : []),
});

export const groups = {
  windowScene: group('舷窗', 'WIN', 'windows', [
    '紫雾回廊', '翡翠星海', '玫瑰星云', '星环彼岸', '蔚蓝近轨', '赤色地平线',
    '冰蓝星境', '引力深渊', '恒星黎明', '轨道星港', '小行星航道', '静默深空',
  ], ['紫色星雾和一颗远月。', '蓝绿星尘围绕近处天体。', '玫瑰色星云和远处的天体。', '金色星环横跨三联窗。', '从近轨看蔚蓝色行星与地平线。', '暗红星场前的橙色行星。', '蓝紫色天体与远方卫星。', '暗色中心与环状吸积盘的想象图。', '恒星从行星地平线上升起。', '远处模块化轨道站，连接桁架、太阳能翼、观测舱与对接口。', '近远小行星散布在航道上。', '深蓝夜空与淡淡星光。']),
  displayItem: group('展柜', 'COL', 'collectibles', [
    '轨道空间站', '深空探测器', '运载火箭', '轻型穿梭机', '星际巡航舰',
    '人造卫星', '月面巡视器', '空间望远镜', '轨道基地模型', '星际航行奖杯',
  ], ['环形站体与两侧太阳能板。', '带抛物面天线的探测器。', '竖立于底座上的多级火箭。', '轻巧的短程轨道飞船。', '有装甲侧舷、舰桥与推进灯。', '展开太阳能板的通信模型。', '带独立轮组的月面探测设备。', '观测镜筒与外接太阳能板。', '组合式居住舱与连接架。', '翼形奖杯模型。'], true),
  deskItem: group('桌面', 'DSK', 'desk', [
    '迷你机器人', '咖啡杯', '生态植物舱', '迷你飞船', '数据晶体', '观测笔记', '全息行星仪', '电子时钟',
  ], [], true),
  wallDecor: group('墙面', 'WAL', 'wall', [
    '飞船工程蓝图', '太阳系星图', '银河系航线图', '空间站结构图',
    '行星主题海报', '探索纪念徽章', '像素艺术相框', '电子航行公告板',
  ], [], true),
  lighting: group('灯光', 'LGT', 'lighting', ['日常暖光', '星云紫光', '工程冷光', '静谧夜航'],
    ['工作灯与生活区使用暖色反射。', '舷窗边缘与沙发一侧有紫色反光。', '青色设备灯勾勒机柜和台面。', '舱内降低亮度，保留低亮设备光。']),
};
export const categories = Object.keys(groups);
export const icons = ['UI-13', 'UI-12', 'UI-14', 'UI-15', 'UI-16'];
export const box = {
  windowScene: [39, 45, 336, 127],
  displayItem: [29, 153, 73, 204],
  deskItem: [333, 145, 371, 182],
  wallDecor: [363, 56, 458, 109],
};
export const assetRoot = '/media/cabin/v02/';
const cabinPath = assetRoot + 'cabin/';
export const fixed = {
  base: cabinPath + 'CAB-S01_Cabin_Base.png',
  windows: cabinPath + 'CAB-S02_Window_Frame.png',
  front: cabinPath + 'CAB-S03_Furniture_Foreground.png',
  objects: cabinPath + 'Fixed_Dressing_Layout.png',
  trim: cabinPath + 'CAB-DETAILS.png',
  radiant: cabinPath + 'FX-RADIANT.png',
};
const config = (windowScene, displayItem, deskItem, wallDecor, lighting, radiant = false) =>
  ({ schemaVersion: 2, windowScene, displayItem, deskItem, wallDecor, lighting, radiant });
export const presets = [
  { id: 'A', name: '紫雾生活舱', value: config('WIN-01', 'COL-01', 'DSK-03', 'WAL-02', 'LGT-01') },
  { id: 'B', name: '蓝色工程舱', value: config('WIN-02', 'COL-05', 'DSK-05', 'WAL-01', 'LGT-03') },
  { id: 'C', name: '金色观测舱', value: config('WIN-04', 'COL-08', 'DSK-06', 'WAL-02', 'LGT-01') },
  { id: 'D', name: '霓虹全息舱', value: config('WIN-02', 'COL-05', 'DSK-07', 'WAL-03', 'LGT-03', true) },
];
export const defaults = presets[0].value;
