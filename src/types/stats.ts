/**
 * 統計情報の型定義
 */

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface StatsData {
  statistics: Statistic[];
}
