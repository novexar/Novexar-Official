/**
 * プロジェクト関連の型定義
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  /** 公開リポジトリのURL。privateプロジェクトでは未設定 */
  url?: string;
  /** owner/name 形式のリポジトリ識別子（表示用） */
  repo?: string;
  /** 非公開リポジトリかどうか */
  private?: boolean;
  /** 所属Organization（個人リポジトリの場合は未設定） */
  org?: string;
  year?: string;
  tags?: string[];
  /** true なら Works 上段のベントに大きく表示する */
  featured?: boolean;
  category?: string;
}

export interface ProjectsData {
  projects: Project[];
}
