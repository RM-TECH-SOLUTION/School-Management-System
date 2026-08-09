import type { Metadata } from 'next';
import AcademicsPageClient from './page.client';

export const metadata: Metadata = {
  title: 'Academics | Northstar International School',
  description: 'Explore Northstar’s academic programmes, inquiry-led curriculum, and student outcomes.',
};

export default function AcademicsPage() {
  return <AcademicsPageClient />;
}
