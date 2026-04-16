import { Outlet, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from '../../config/navigation'
import { BottomNav } from './BottomNav'
import { DesktopSidebar } from './DesktopSidebar'
import { TopBar } from './TopBar'

export function AppShell() {
  const location = useLocation()
  const currentItem = NAV_ITEMS.find((item) =>
    item.id === 'dashboard'
      ? location.pathname === '/' || location.pathname === '/dashboard'
      : item.path === location.pathname,
  )

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <div className="mx-auto flex w-full max-w-[1940px] gap-4 px-4 py-4 sm:px-5 lg:gap-4 lg:px-4 xl:gap-5 xl:px-4 2xl:max-w-[2040px] 2xl:gap-6 2xl:px-4">
        <DesktopSidebar />

        <div className="min-w-0 flex-1">
          <TopBar />
          <main
            className="min-w-0 animate-[settle-in_520ms_var(--ease-standard)_both]"
            aria-label={currentItem?.label ?? 'Conteúdo principal'}
          >
            <Outlet />
          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
