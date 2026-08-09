'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Film, Music2, TreeDeciduous } from 'lucide-react';
import { PublicRouteHeader } from '@/components/public-route-header';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const lifeHighlights = [
  {
    title: 'Outdoor learning',
    description: 'Gardens, sports fields and shaded courtyards bring learning outdoors every day.',
    icon: TreeDeciduous,
  },
  {
    title: 'Arts and performance',
    description: 'Visual arts, music and theatre are woven into school rhythms and celebrations.',
    icon: Music2,
  },
  {
    title: 'Media studio',
    description: 'Students create stories, podcasts and film projects from our digital studio spaces.',
    icon: Film,
  },
  {
    title: 'Leadership paths',
    description: 'Clubs, service projects and student councils help learners lead with purpose.',
    icon: Compass,
  },
];

export default function CampusLifePageClient() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PublicRouteHeader />

      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,215,0,0.18),_transparent_35%)]" />
        <div className="shell relative py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="max-w-4xl">
            <p className="eyebrow text-gold">Campus life</p>
            <h1 className="display mt-6 text-5xl leading-tight sm:text-6xl">A living campus for curious minds.</h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/80">
              Here, students learn in studios, fields and community spaces that encourage play, expression and quiet reflection.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="rounded-full border border-paper/30 px-7 py-3 text-sm transition hover:border-gold">
                School story
              </Link>
              <Link href="/achievements" className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-ink transition hover:bg-gold/90">
                Student success
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="shell py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, delay: 0.1 }}>
            <h2 className="display text-4xl sm:text-5xl">Every day feels different here.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              From art studios to sports fields, every corner of campus supports exploration, teamwork and wellbeing.
            </p>
          </motion.div>
          <div className="grid gap-6 text-sm text-ink/70 sm:grid-cols-2">
            {lifeHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.5, delay: 0.08 * lifeHighlights.indexOf(item) }} className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold text-ink">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/75">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, delay: 0.15 }} className="rounded-[2rem] border border-ink/10 bg-ink/5 p-12">
            <h2 className="display text-5xl">A rhythm of learning and life.</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              Students balance academics with arts, leadership and wellbeing activities, building purpose through both challenge and joy.
            </p>
          </motion.div>
          <div className="grid gap-6 text-sm text-ink/70 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-ink/90 p-8 text-paper">
              <strong className="text-3xl">60+</strong>
              <p className="mt-4">Clubs and activities for every interest.</p>
            </div>
            <div className="rounded-[2rem] bg-ink/90 p-8 text-paper">
              <strong className="text-3xl">4</strong>
              <p className="mt-4">Core campus spaces for arts, science, media and wellbeing.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
