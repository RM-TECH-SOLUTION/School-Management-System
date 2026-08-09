import { cn } from '@/lib/utils';
export function Card({className,children}:{className?:string;children:React.ReactNode}){return <section className={cn('rounded-xl border border-ink/10 bg-white shadow-sm',className)}>{children}</section>}
