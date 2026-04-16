import type { InputHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'min-h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-text shadow-soft',
        'placeholder:text-text-soft transition-[border-color,box-shadow,background-color] duration-200 ease-out',
        'hover:border-border-strong focus:border-accent focus:bg-surface focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}
