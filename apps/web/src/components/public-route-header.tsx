'use client';
import Link from 'next/link';

const nav = [
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Campus Life', href: '/campus-life' },
  { label: 'Achievements', href: '/achievements' },
];

export function PublicRouteHeader() {
  return (
    <header className="shell relative z-10 flex flex-wrap items-center justify-between gap-3 py-7">
      <Link href="/" className="display text-2xl">
        northstar<span className="text-gold">.</span>
      </Link>

      <nav className="hidden gap-6 text-xs lg:flex">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition hover:text-gold"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/admissions"
          className="rounded-full border border-ink/10 bg-white px-5 py-2 text-xs font-bold uppercase text-ink transition hover:border-gold hover:text-gold"
        >
          Admissions
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-paper/40 bg-white px-5 py-2 text-xs transition hover:bg-paper hover:text-ink"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
}
