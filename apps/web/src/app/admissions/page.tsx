import type { Metadata } from 'next';
import AdmissionsPageClient from './page.client';

export const metadata: Metadata = {
  title: 'Admissions | Northstar International School',
  description: 'Begin the admissions journey and learn how to connect with Northstar’s admissions team.',
};

export default function AdmissionsPage() {
  return <AdmissionsPageClient />;
}
