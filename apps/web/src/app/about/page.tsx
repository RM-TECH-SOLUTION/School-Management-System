import type { Metadata } from 'next';
import AboutPageClient from './page.client';

export const metadata: Metadata = {
  title: 'About | Northstar International School',
  description: 'Learn about Northstar’s mission, legacy, and community values.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
