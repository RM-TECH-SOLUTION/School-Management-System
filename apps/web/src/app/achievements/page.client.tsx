'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, Flag, Lightbulb, Trophy } from 'lucide-react';
import { PublicRouteHeader } from '@/components/public-route-header';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const achievements = [
  {
    label: 'Academic excellence',
    detail: 'National science and mathematics competition finalists for three consecutive years.',
    icon: Lightbulb,
  },
  {
    label: 'Leadership',
    detail: 'Student-led service initiatives with meaningful community impact.',
    icon: Flag,
  },
  {
    label: 'Creative showcases',
    detail: 'Annual arts festival, theatre productions and student film premieres.',
    icon: Trophy,
  },
  {
    label: 'Global outcomes',
    detail: 'Graduates accepted to top universities, regional programmes and creative institutions.',
    icon: BarChart3,
  },
];

export default function AchievementsPageClient() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PublicRouteHeader />

      <section className="relative overflow-hidden bg-moss text-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_40%)]" />
        <div className="shell relative py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="max-w-4xl">
            <p className="eyebrow text-gold">Achievements</p>
            <h1 className="display mt-6 text-5xl leading-tight sm:text-6xl">A history of distinction and dynamic impact.</h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/85">
              Northstar students are recognised for academic rigour, creative expression and leadership that serves others.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="rounded-full border border-paper/50 px-7 py-3 text-sm transition hover:border-gold">
                Our values
              </Link>
              <Link href="/campus-life" className="rounded-full bg-ink px-7 py-3 text-sm font-bold text-paper transition hover:bg-ink/90">
                Experience campus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="shell py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                initial="hidden"
                animate="visible"
                variants={cardMotion}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-sm hover:-translate-y-1 hover:border-gold transition-transform"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold text-ink">
                  <Icon className="size-6" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold">{achievement.label}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{achievement.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="shell grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, delay: 0.1 }}>
            <h2 className="display text-5xl">Outcomes that matter.</h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/75">
              Our graduates go on to lead, create and innovate. The achievements shown here are the result of sustained support, bold learning and careful mentorship.
            </p>
          </motion.div>
          <div className="grid gap-6 text-sm text-ink/70 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-ink/90 p-8 text-paper">
              <strong className="text-3xl">96%</strong>
              <p className="mt-4">University placement and postgraduate pathways.</p>
            </div>
            <div className="rounded-[2rem] bg-ink/90 p-8 text-paper">
              <strong className="text-3xl">150+</strong>
              <p className="mt-4">Awards and recognitions across academics, arts and leadership.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
