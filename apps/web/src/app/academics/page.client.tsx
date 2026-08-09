'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { PublicRouteHeader } from '@/components/public-route-header';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const pillars = [
  {
    title: 'Inquiry first',
    description: 'Students learn through questions, research and real-world challenge projects.',
    icon: BookOpen,
  },
  {
    title: 'Expert guidance',
    description: 'Educators design learning pathways that are deep, relevant and personalised.',
    icon: GraduationCap,
  },
  {
    title: 'Creative confidence',
    description: 'Critical thinking and communication are built into every subject and activity.',
    icon: Sparkles,
  },
];

export default function AcademicsPageClient() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PublicRouteHeader />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,215,0,0.14),_transparent_35%)]" />
        <div className="shell relative py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="max-w-4xl">
            <p className="eyebrow text-gold">Academic excellence</p>
            <h1 className="display mt-6 text-5xl leading-tight sm:text-6xl">Learning that travels further.</h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/80">
              Our inquiry-led curriculum gives learners the knowledge, discernment and imagination to participate meaningfully in a complex world.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/admissions" className="rounded-full bg-ink px-7 py-3 text-sm font-bold text-paper transition hover:bg-ink/90">
                Apply now
              </Link>
              <Link href="/achievements" className="rounded-full border border-ink/10 px-7 py-3 text-sm transition hover:border-gold">
                See outcomes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-moss py-20 text-paper">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.5 }} className="rounded-[2rem] bg-ink p-10 shadow-lg">
            <p className="eyebrow text-gold">Programme highlights</p>
            <h2 className="mt-5 text-4xl">A curriculum that honours depth, creativity and purpose.</h2>
            <p className="mt-6 text-sm leading-relaxed text-paper/80">
              We blend core knowledge, interdisciplinary projects and global thinking so each student builds confidence and insight.
            </p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-[2rem] border border-ink/10 bg-paper p-10">
            <h3 className="text-3xl font-semibold">What students experience</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/70">
              <li>Personalised mentorship and learning goals for each student.</li>
              <li>Project work that connects concepts to community and innovation.</li>
              <li>Assessments that prioritise growth, reflection and transferable skills.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="shell py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                animate="visible"
                variants={cardMotion}
                transition={{ duration: 0.45, delay: 0.08 * index }}
                className="group rounded-[2rem] border border-ink/10 bg-paper p-8 hover:-translate-y-1 hover:border-gold hover:shadow-xl transition-transform"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold text-ink">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold group-hover:text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, delay: 0.1 }}>
            <p className="eyebrow text-gold">Classroom impact</p>
            <h2 className="display text-5xl">Thoughtful classrooms built for deeper learning.</h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/75">
              Experience is central to every lesson. Students collaborate on studio-style projects, solve problems in teams, and present learning with confidence.
            </p>
          </motion.div>
          <div className="grid gap-6 text-sm text-ink/70 sm:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.45, delay: 0.15 }} className="rounded-[2rem] bg-ink/90 p-8 text-paper">
              <strong className="text-3xl">92%</strong>
              <p className="mt-4">Students reporting deeper engagement in learning through guided inquiry.</p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.45, delay: 0.2 }} className="rounded-[2rem] bg-ink/90 p-8 text-paper">
              <strong className="text-3xl">4 pathways</strong>
              <p className="mt-4">Academic strands that prepare learners for university, careers and creative future work.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
