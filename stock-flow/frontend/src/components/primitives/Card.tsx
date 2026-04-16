import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    elevated?: boolean
  }
>

export function Card({ children, className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[1.6rem] border border-border/90 bg-surface p-4 transition-transform duration-200 ease-out sm:p-5',
        elevated ? 'shadow-card' : 'shadow-soft',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
