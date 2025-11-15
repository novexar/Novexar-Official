/**
 * スキル関連の型定義
 */

export interface Skill {
  name: string;
  level: number;
  icon: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface SkillsData {
  skillCategories: SkillCategory[];
}
