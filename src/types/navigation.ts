/**
 * ナビゲーション関連の型定義
 */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  isOpen?: boolean;
  onToggle?: () => void;
}
