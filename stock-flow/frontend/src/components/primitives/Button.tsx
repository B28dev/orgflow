import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'md' | 'sm' | 'icon'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
  }
>

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border border-accent bg-accent text-white shadow-floating hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_16px_32px_rgba(80,172,84,0.18)] active:translate-y-0 active:scale-[0.99] active:bg-accent-strong',
  secondary:
    'border border-border bg-surface text-text shadow-soft hover:-translate-y-0.5 hover:border-accent/20 hover:bg-accent-soft/60 hover:text-text active:translate-y-0 active:scale-[0.99]',
  ghost:
    'border border-transparent bg-transparent text-text-muted hover:bg-surface-muted hover:text-text active:scale-[0.99]',
  danger:
    'border border-danger bg-danger text-white shadow-soft hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 active:scale-[0.99]',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4 py-3 text-sm font-semibold',
  sm: 'min-h-11 px-3 py-2.5 text-sm font-medium',
  icon: 'size-11 items-center justify-center p-0',
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex rounded-xl transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50',
        'focus-visible:outline-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
