/**
 * 経歴関連の型定義
 */

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Contract';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
}

export interface ExperienceData {
  timeline: TimelineItem[];
  certifications: Certification[];
}
