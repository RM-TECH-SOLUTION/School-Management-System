'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Globe, ShieldCheck } from 'lucide-react';
import { PublicRouteHeader } from '@/components/public-route-header';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const cardMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const values = [
  {
    title: 'Inspired learning',
    description: 'Inquiry-led classrooms help every student build knowledge through questions, projects and reflection.',
    icon: BookOpen,
  },
  {
    title: 'Character first',
    description: 'Learners are supported to develop resilience, integrity and the courage to lead with care.',
    icon: ShieldCheck,
  },
  {
    title: 'Global perspective',
    description: 'A connected campus nourishes curiosity, citizenship and creative thinking across cultures.',
    icon: Globe,
  },
];

export default function AboutPageClient() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PublicRouteHeader />

      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,215,0,0.18),_transparent_35%)]" />
        <div className="shell relative py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }} className="max-w-4xl">
            <p className="eyebrow text-gold">Our heritage</p>
            <h1 className="display mt-6 text-5xl leading-tight sm:text-6xl">A legacy of thoughtful achievement.</h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/85">
              Since 1987, Northstar has combined academic ambition with deep human care. We prepare learners to think clearly, act kindly, and contribute with purpose.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/admissions" className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-ink transition hover:bg-gold/90">
                Join the community
              </Link>
              <Link href="/achievements" className="rounded-full border border-paper/30 px-7 py-3 text-sm transition hover:border-gold">
                See our outcomes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="display text-4xl sm:text-5xl">A distinct culture of learning and belonging.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              Our approach is shaped by deep relationships, rich inquiry, and a belief that each student belongs to a powerful educational story.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  animate="visible"
                  variants={cardMotion}
                  transition={{ duration: 0.5 }}
                  className="rounded-[2rem] border border-ink/10 bg-paper p-8 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold text-ink">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-[2rem] bg-moss/10 px-8 py-14 text-ink shadow-xl"
        >
          <div className="grid gap-6 lg:grid-cols-[1.4fr_.9fr]">
            <div>
              <p className="eyebrow text-gold">How we teach</p>
              <h2 className="display mt-6 text-4xl sm:text-5xl">Deep learning, thoughtfully guided.</h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-ink/80">
                Teachers design learning journeys that are ambitious, relevant and student-led. Our classrooms bring complex ideas to life through projects, discussion and reflection.
              </p>
            </div>
            <div className="space-y-4 text-sm text-ink/80">
              <p className="rounded-3xl bg-paper/10 p-6">A culture of mentoring means every student is seen and supported.</p>
              <p className="rounded-3xl bg-paper/10 p-6">We balance academic depth with creativity, service and wellbeing.</p>
              <p className="rounded-3xl bg-paper/10 p-6">Our graduates leave with confidence and a clear sense of purpose.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20">
        <div className="shell grid gap-8 lg:grid-cols-3">
          {[
            { label: '1987', text: 'Founded as a school with a bold commitment to inquiry and community.' },
            { label: '96%', text: 'University placement for our most recent senior cohort.' },
            { label: '1,840+', text: 'Students learning with curiosity, confidence and care across campus.' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial="hidden"
              animate="visible"
              variants={cardMotion}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[2rem] border border-ink/10 bg-paper p-8"
            >
              <strong className="display text-5xl text-ink">{item.label}</strong>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
