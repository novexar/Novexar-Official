/**
 * プロジェクト関連の型定義
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
  url: string;
  tags?: string[];
  featured?: boolean;
  category?: 'azure' | 'ai' | 'frontend' | 'backend' | 'tool';
}

export interface ProjectsData {
  projects: Project[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface CarouselProps {
  items: Project[];
  autoPlay?: boolean;
  interval?: number;
}
