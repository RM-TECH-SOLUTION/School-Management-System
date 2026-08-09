import type { Metadata } from 'next';
import AchievementsPageClient from './page.client';

export const metadata: Metadata = {
  title: 'Achievements | Northstar International School',
  description: 'See recent student achievements, awards and outcomes from Northstar.',
};

export default function AchievementsPage() {
  return <AchievementsPageClient />;
}
