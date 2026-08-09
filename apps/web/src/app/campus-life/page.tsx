import type { Metadata } from 'next';
import CampusLifePageClient from './page.client';

export const metadata: Metadata = {
  title: 'Campus Life | Northstar International School',
  description: 'Discover the vibrant campus life, facilities and student experiences at Northstar.',
};

export default function CampusLifePage() {
  return <CampusLifePageClient />;
}
