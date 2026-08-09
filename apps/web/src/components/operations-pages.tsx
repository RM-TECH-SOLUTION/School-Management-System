'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const listStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const spring = { type: 'spring', stiffness: 260, damping: 24 };
const actionButtonClass =
  'rounded-full bg-moss px-5 py-3 text-sm font-bold text-paper transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-moss/60 disabled:cursor-not-allowed disabled:opacity-60';

const statusOptions = [
  'NEW',
  'UNDER_REVIEW',
] as const;

const statusLabels: Record<string, string> = {
  NEW: 'New',
  UNDER_REVIEW: 'Under review',
};

const badgeClasses = (status: string) => {
  const palette: Record<string, string> = {
    NEW: 'bg-moss/10 text-moss',
    CONTACTED: 'bg-ink/5 text-ink',
    APPLICATION_STARTED: 'bg-blue-50 text-blue-700',
    DOCUMENT_PENDING: 'bg-amber-50 text-amber-800',
    UNDER_REVIEW: 'bg-violet-50 text-violet-700',
    APPROVED: 'bg-emerald-50 text-emerald-700',
    REJECTED: 'bg-rose-50 text-rose-700',
    ADMITTED: 'bg-cyan-50 text-cyan-700',
  };
  return `inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${palette[status] || 'bg-ink/5 text-ink'}`;
};

function Title({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <motion.div layout className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow text-moss">{eyebrow}</p>
        <h1 className="display mt-3 text-5xl">{title}</h1>
      </div>
      {action}
    </motion.div>
  );
}

const ActionButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`${actionButtonClass} ${props.className ?? ''}`}
  >
    {children}
  </button>
);

const MotionActionButton = motion(ActionButton);

export function Students() {
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => api('/students').then(setItems).catch((e) => setError(e.message));

  useEffect(() => {
    setError('');
    load();
  }, []);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      setSaving(true);
      await api('/students', { method: 'POST', body: JSON.stringify(payload) });
      setOpen(false);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.35 }}>
      <Title eyebrow="Student management" title="Students" action={<MotionActionButton whileTap={{ scale: 0.98 }} onClick={() => setOpen(true)}>Add student</MotionActionButton>} />

      {error ? <p className="mt-4 text-red-700">{error}</p> : null}

      <motion.div layout className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-ink/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-ink/5 text-xs uppercase tracking-[0.12em] text-ink/60">
            <tr>
              <th className="p-5">Student</th>
              <th>Admission no.</th>
              <th>Class</th>
              <th></th>
            </tr>
          </thead>
          <motion.tbody variants={listStagger} initial="hidden" animate="visible">
            {items.map((student) => (
              <motion.tr
                key={student.id}
                variants={cardMotion}
                transition={{ duration: 0.22 }}
                className="border-b last:border-0 hover:bg-ink/5"
              >
                <td className="p-5 font-semibold text-ink">{student.firstName} {student.lastName}</td>
                <td className="p-5 text-ink/75">{student.admissionNo}</td>
                <td className="p-5 text-ink/75">
                  {student.enrollments?.[0]?.section?.class?.name || 'Unassigned'}
                  {student.enrollments?.[0]?.section?.name ? ` • ${student.enrollments[0].section.name}` : ''}
                </td>
                <td className="p-5">
                  <Link className="text-moss underline" href={`/dashboard/students/${student.id}`}>View</Link>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>

        {!items.length && !error ? (
          <div className="p-8 text-sm text-ink/50">No students found. Add a student to begin the roster.</div>
        ) : null}
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="student-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 grid place-items-center bg-ink/50 p-4"
          >
            <motion.form
              onSubmit={save}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={spring}
              className="w-full max-w-xl rounded-[2rem] bg-paper p-8 shadow-2xl ring-1 ring-ink/10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-moss">New student</p>
                  <h2 className="display mt-3 text-3xl">Add a student</h2>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-ink/10 px-4 py-2 text-sm text-ink transition hover:bg-ink/5">
                  Close
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ['admissionNo', 'Admission number'],
                  ['firstName', 'First name'],
                  ['lastName', 'Last name'],
                  ['email', 'Email'],
                ].map(([name, label]) => (
                  <label key={name} className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
                    {label}
                    <input
                      required={name !== 'email'}
                      name={name}
                      placeholder={label}
                      className="mt-2 w-full rounded-3xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MotionActionButton type="submit" whileTap={{ scale: 0.98 }} disabled={saving}>{saving ? 'Saving...' : 'Save student'}</MotionActionButton>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full border px-5 py-3 text-sm text-ink transition hover:bg-ink/5">
                  Cancel
                </button>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function Attendance() {
  const [students, setStudents] = useState<any[]>([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    api('/students').then(setStudents).catch((e) => setResult(e.message));
  }, []);

  async function save() {
    const sectionId = students[0]?.enrollments?.[0]?.sectionId;
    if (!sectionId) return setResult('Add/enrol a student first.');

    try {
      await api('/attendance', {
        method: 'POST',
        body: JSON.stringify({
          sectionId,
          date: new Date().toISOString().slice(0, 10),
          records: students.map((s) => ({
            studentId: s.id,
            status: (document.getElementById(s.id) as HTMLSelectElement)?.value || 'PRESENT',
          })),
        }),
      });
      setResult('Attendance saved for today.');
    } catch (e: any) {
      setResult(e.message);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.35, delay: 0.05 }}>
      <Title eyebrow="Daily register" title="Attendance" />
      <p className="mt-4 text-sm text-ink/60">Grade 8 A · {new Date().toLocaleDateString()}</p>
      <motion.div initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.35, delay: 0.05 }} className="mt-8 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-ink/5">
        {students.map((s) => (
          <motion.div key={s.id} layout className="flex items-center justify-between border-b p-4 last:border-0" whileHover={{ y: -1 }}>
            <span className="font-semibold text-ink">{s.firstName} {s.lastName}</span>
            <select id={s.id} className="rounded-lg border border-ink/10 px-3 py-2 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20">
              <option>PRESENT</option>
              <option>ABSENT</option>
              <option>LATE</option>
              <option>EXCUSED</option>
            </select>
          </motion.div>
        ))}
        <div className="p-4">
          <MotionActionButton type="button" whileTap={{ scale: 0.98 }} onClick={save}>Save attendance</MotionActionButton>
          {result ? <span className="ml-4 text-sm text-ink/70">{result}</span> : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Admissions() {
  const [items, setItems] = useState<any[]>([]);
  const [result, setResult] = useState('');
  const [creating, setCreating] = useState(false);

  const load = () => api('/admissions').then(setItems).catch((e) => setResult(e.message));

  useEffect(() => {
    setResult('');
    load();
  }, []);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      setCreating(true);
      await api('/admissions', { method: 'POST', body: JSON.stringify(payload) });
      (e.target as HTMLFormElement).reset();
      load();
    } catch (e: any) {
      setResult(e.message);
    } finally {
      setCreating(false);
    }
  }

  async function status(id: string, nextStatus: string) {
    try {
      await api(`/admissions/${id}`, { method: 'PATCH', body: JSON.stringify({ status: nextStatus }) });
      load();
    } catch (e: any) {
      setResult(e.message);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.35, delay: 0.05 }}>
      <Title eyebrow="Admissions pipeline" title="Enquiries" />

      <motion.form
        onSubmit={add}
        className="mt-8 grid gap-3 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-ink/5 md:grid-cols-4"
      >
        <input name="applicantName" required placeholder="Applicant name" className="rounded-3xl border border-ink/10 px-4 py-3 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20" />
        <input name="email" type="email" placeholder="Email" className="rounded-3xl border border-ink/10 px-4 py-3 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20" />
        <input name="phone" placeholder="Phone" className="rounded-3xl border border-ink/10 px-4 py-3 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20" />
        <ActionButton type="submit" disabled={creating}>{creating ? 'Creating...' : 'Create enquiry'}</ActionButton>
      </motion.form>

      {result ? <p className="mt-3 text-sm text-red-700">{result}</p> : null}

      <div className="mt-6 grid gap-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink">{item.applicantName}</p>
                  <p className="mt-1 text-sm text-ink/60">{item.email || item.phone || 'No contact provided'}</p>
                </div>
                <span className={badgeClasses(item.status)}>{statusLabels[item.status] || item.status}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label className="text-xs uppercase tracking-[0.18em] text-ink/50">Status</label>
                <select
                  value={item.status}
                  onChange={(e) => status(item.id, e.target.value)}
                  className="rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{statusLabels[option] ?? option}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!items.length && !result ? (
        <div className="mt-8 rounded-[2rem] bg-ink/5 p-8 text-sm text-ink/50">No enquiries yet. Create the first admission enquiry to power the intake pipeline.</div>
      ) : null}
    </motion.div>
  );
}

export function Fees() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [result, setResult] = useState('');

  const load = () => api('/fees').then(setInvoices).catch((e) => setResult(e.message));

  useEffect(() => {
    load();
    api('/students').then(setStudents).catch((e) => setResult(e.message));
  }, []);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      amount: Number(form.get('amount')),
    };

    try {
      await api('/fees', { method: 'POST', body: JSON.stringify(payload) });
      load();
    } catch (e: any) {
      setResult(e.message);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.35, delay: 0.05 }}>
      <Title eyebrow="Finance" title="Fees & invoices" />

      <motion.form onSubmit={add} initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.35, delay: 0.05 }} className="mt-8 grid gap-3 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-ink/5 md:grid-cols-4">
        <select name="studentId" className="rounded-3xl border border-ink/10 px-4 py-3 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20">
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
          ))}
        </select>
        <input name="amount" required type="number" placeholder="Amount" className="rounded-3xl border border-ink/10 px-4 py-3 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20" />
        <input name="dueDate" required type="date" className="rounded-3xl border border-ink/10 px-4 py-3 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20" />
        <MotionActionButton type="submit" whileTap={{ scale: 0.98 }}>Create invoice</MotionActionButton>
      </motion.form>

      {result ? <p className="mt-3 text-sm text-red-700">{result}</p> : null}

      <motion.div className="mt-6 space-y-3" variants={listStagger} initial="hidden" animate="visible">
        {invoices.map((invoice) => (
          <motion.div key={invoice.id} variants={cardMotion} className="flex justify-between rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-ink/5 hover:-translate-y-0.5 transition-transform duration-200">
            <span><b>{invoice.invoiceNo}</b> · {invoice.student.firstName} {invoice.student.lastName}</span>
            <span>₹{invoice.amount} · {invoice.status}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Website() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    api('/website/homepage')
      .then((c) => {

        setTitle(c?.title || '');
        setDescription(c?.body?.description || '');
      })
      .catch((e) => setResult(e.message));
  }, []);

  async function save(status: string) {
    try {
      await api('/website/homepage', {
        method: 'POST',
        body: JSON.stringify({
          title,
          body: {
            description,
            eyebrow: 'Northstar International School · Est. 1987',
            heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85',
            stats: [
              ['38', 'years of excellence'],
              ['1,840', 'students finding their path'],
              ['142', 'educators and mentors'],
              ['96%', 'university placement'],
            ],
          },
          status,
        }),
      });
      setResult(status === 'PUBLISHED' ? 'Published—live homepage updated.' : 'Draft saved.');
    } catch (e: any) {
      setResult(e.message);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.35, delay: 0.05 }}>
      <Title eyebrow="Website CMS" title="Homepage" />
      <motion.div initial="hidden" animate="visible" variants={cardMotion} transition={{ duration: 0.35, delay: 0.05 }} className="mt-8 max-w-3xl rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-ink/5">
        <p className="text-sm text-ink/60">These fields publish directly to the public homepage.</p>
        <label className="mt-6 block text-sm font-bold">
          Hero headline
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-3xl border border-ink/10 px-4 py-3 text-sm outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20" />
        </label>
        <label className="mt-5 block text-sm font-bold">
          Legacy statement
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 min-h-[7rem] w-full rounded-3xl border border-ink/10 px-4 py-3 text-sm outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20" />
        </label>
        <div className="mt-6 flex flex-wrap gap-3">
          <ActionButton type="button" onClick={() => save('PUBLISHED')}>Publish changes</ActionButton>
          <button onClick={() => save('DRAFT')} type="button" className="rounded-full border px-5 py-3 text-sm transition hover:bg-ink/5">Save draft</button>
        </div>
        {result ? <p className="mt-4 text-sm text-moss">{result}</p> : null}
      </motion.div>
    </motion.div>
  );
}
