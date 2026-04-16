import type { SelectHTMLAttributes } from 'react'

import { ChevronDown } from 'lucide-react'

import { cn } from '../../utils/cn'

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          'min-h-12 w-full appearance-none rounded-2xl border border-border bg-surface px-4 pr-10 text-sm text-text shadow-soft',
          'transition-[border-color,box-shadow,background-color] duration-200 ease-out hover:border-border-strong focus:border-accent focus:bg-surface focus:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text-soft transition-colors duration-200" />
    </div>
  )
}
