import type { PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type PageContainerProps = PropsWithChildren<{
  className?: string
}>

export function PageContainer({ children, className }: PageContainerProps) {
  return <section className={cn('flex w-full flex-col gap-6 px-0 py-4', className)}>{children}</section>
}
