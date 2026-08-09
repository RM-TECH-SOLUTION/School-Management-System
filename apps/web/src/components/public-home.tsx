'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PublicRouteHeader } from '@/components/public-route-header';

const routes = [
  {
    label: 'About',
    href: '/about',
    description: 'Our story, values, and community-focused mission.',
  },
  {
    label: 'Academics',
    href: '/academics',
    description: 'Inquiry-led learning, leadership pathways, and programme highlights.',
  },
  {
    label: 'Admissions',
    href: '/admissions',
    description: 'Begin your application journey with personalised support.',
  },
  {
    label: 'Campus Life',
    href: '/campus-life',
    description: 'A thriving campus of arts, sport, service and wellbeing.',
  },
  {
    label: 'Achievements',
    href: '/achievements',
    description: 'Student success stories, awards, and future-ready outcomes.',
  },
];

const fallback = {
  title: 'A place to become',
  body: {
    eyebrow: 'Northstar International School · Est. 1987',
    description: 'A generous education for curious minds, courageous hearts and a changing world.',
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85',
    stats: [
      ['38', 'years of excellence'],
      ['1,840', 'students finding their path'],
      ['142', 'educators and mentors'],
      ['96%', 'university placement'],
    ],
  },
};

export function PublicHome({ content }: any) {
  const c = content || fallback;
  let body = c.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const b = { ...fallback.body, ...body } as any;
  const title = c.title || fallback.title;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <PublicRouteHeader />

      <section className="relative overflow-hidden bg-ink text-paper">
        <img
          src={b.heroImage}
          alt="Northstar campus"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-transparent" />
        <div className="shell relative z-10 grid min-h-[720px] items-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6 text-gold">{b.eyebrow}</p>
            <h1 className="display text-5xl leading-tight sm:text-7xl lg:text-8xl">{title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">{b.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-ink transition hover:bg-gold/90">
                Explore Northstar
              </Link>
              <Link href="/admissions" className="rounded-full border border-paper/50 px-7 py-3 text-sm transition hover:border-gold">
                Admissions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="grid gap-8 text-center"
          >
            <p className="eyebrow text-moss">Choose your journey</p>
            <h2 className="display text-4xl sm:text-5xl">Explore Northstar one page at a time.</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {routes.map((route, index) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
                className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-sm hover:-translate-y-1 hover:border-gold transition-transform"
              >
                <h3 className="text-2xl font-semibold">{route.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{route.description}</p>
                <Link href={route.href} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-gold">
                  Visit {route.label} <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="shell grid gap-8 md:grid-cols-4">
          {b.stats.map(([number, label]: string[]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-8"
            >
              <p className="display text-4xl tracking-tight text-paper">{number}</p>
              <span className="mt-3 block text-sm text-paper/80">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
