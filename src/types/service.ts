/**
 * サービス関連の型定義
 */

export interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
  details?: string[];
  tags?: string[];
}

export interface ServicesData {
  services: Service[];
}

export interface ServiceCardProps {
  service: Service;
  index?: number;
}
