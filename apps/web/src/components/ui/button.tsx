import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
export function Button({className,...props}:ButtonHTMLAttributes<HTMLButtonElement>){return <button className={cn('inline-flex h-10 items-center justify-center rounded-md bg-moss px-4 text-sm font-medium text-white transition hover:bg-moss/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50',className)} {...props}/>}
