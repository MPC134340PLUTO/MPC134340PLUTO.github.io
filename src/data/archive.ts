export const categories = [
  { id: 'algorithm', cn: '算法竞赛', en: 'ALGORITHM' },
  { id: 'research', cn: '科研探索', en: 'RESEARCH' },
  { id: 'development', cn: '开发项目', en: 'DEVELOPMENT' },
  { id: 'notes', cn: '学习笔记', en: 'NOTES' },
] as const;

export type ArchiveFrontmatter = {
  title: string;
  category: string;
  description: string;
  tags?: string[];
  sample?: boolean;
};

export function categoryName(id: string) {
  return categories.find(category => category.id === id)?.cn ?? '其他';
}
