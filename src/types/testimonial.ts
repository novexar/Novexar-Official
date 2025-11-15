/**
 * テスティモニアル（お客様の声）の型定義
 */

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  comment: string;
  project: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}
