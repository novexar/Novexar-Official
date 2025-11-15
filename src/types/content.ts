/**
 * サイトコンテンツの型定義
 */

import { NavigationItem } from './navigation';

export interface SiteInfo {
  title: string;
  tagline: string;
  description: string;
  copyright: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export interface ContactContent {
  title: string;
  github: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export interface SiteContent {
  site: SiteInfo;
  navigation: NavigationItem[];
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
}
