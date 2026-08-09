'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Mail, UserCheck } from 'lucide-react';
import { PublicRouteHeader } from '@/components/public-route-header';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const steps = [
  {
    title: 'Reach out',
    description: 'Begin with a direct conversation so we can personalise your admissions journey.',
    icon: Mail,
  },
  {
    title: 'Visit campus',
    description: 'Experience our classrooms, gardens and community in person.',
    icon: CalendarDays,
  },
  {
    title: 'Apply with confidence',
    description: 'Submit your story, not just a form, and let our team support your application.',
    icon: UserCheck,
  },
  {
    title: 'Start the year ahead',
    description: 'Receive dedicated guidance from offer through orientation.',
    icon: CheckCircle2,
  },
];

export default function AdmissionsPageClient() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PublicRouteHeader />

      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,215,0,0.14),_transparent_40%)]" />
        <div className="shell relative py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="max-w-4xl">
            <p className="eyebrow text-gold">Admissions</p>
            <h1 className="display mt-6 text-5xl leading-tight sm:text-6xl">Begin a purposeful journey.</h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/80">
              We welcome families who value challenge, kindness and a school that blends intellectual discovery with character-building experiences.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="mailto:admissions@northstar.edu" className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-ink transition hover:bg-gold/90">
                Contact admissions
              </a>
              <Link href="/about" className="rounded-full border border-paper/30 px-7 py-3 text-sm transition hover:border-gold">
                Discover our story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="shell py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, delay: 0.1 }}>
            <h2 className="display text-4xl sm:text-5xl">A thoughtful process for every family.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              Our admissions experience is built around clarity, care and coaching. Every enquiry is handled by a dedicated team who listens first.
            </p>
          </motion.div>
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.45, delay: 0.08 * index }} className="group rounded-[2rem] border border-ink/10 bg-paper p-8 shadow-sm hover:-translate-y-1 hover:border-gold transition-transform">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-ink text-paper">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-moss py-20 text-paper">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, delay: 0.14 }}>
            <p className="eyebrow text-gold">What to expect</p>
            <h2 className="display text-5xl">Guidance from first contact to first day.</h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-paper/80">
              Our admissions team provides clear next steps, personalised visits and thoughtful support throughout the process.
            </p>
          </motion.div>
          <div className="grid gap-6 text-sm text-paper/85 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-ink/90 p-8">
              <strong className="text-3xl">Personal tours</strong>
              <p className="mt-4">Experience our school during a guided visit with a current student ambassador.</p>
            </div>
            <div className="rounded-[2rem] bg-ink/90 p-8">
              <strong className="text-3xl">Individual support</strong>
              <p className="mt-4">Receive timely answers, document guidance and cultural fit advice for your child.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
