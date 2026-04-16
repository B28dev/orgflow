import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { getActiveNavItem } from '../../config/navigation'
import { MobileDrawer } from './MobileDrawer'
import { DesktopSidebar } from './DesktopSidebar'
import { TopBar } from './TopBar'

export function AppShell() {
  const location = useLocation()
  const currentItem = getActiveNavItem(location.pathname)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => {
    setIsMobileNavOpen(false)
  }, [location.pathname])

  // Close drawer on Escape
  useEffect(() => {
    if (!isMobileNavOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileNavOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isMobileNavOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow
    if (isMobileNavOpen) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMobileNavOpen])

  const closeMobileNav = () => setIsMobileNavOpen(false)
  const toggleMobileNav = () => setIsMobileNavOpen((v) => !v)

  return (
    <div
      className="relative min-h-[100dvh] xl:[--shell-sidebar-width:17rem] 2xl:[--shell-sidebar-width:18.5rem]"
    >
      {/* ── Desktop: Fixed structural sidebar ── */}
      <DesktopSidebar />

      {/* ── Mobile: Drawer off-canvas ── */}
      <MobileDrawer isOpen={isMobileNavOpen} onClose={closeMobileNav} />

      {/* ── Main content area ── */}
      <div className="flex min-h-[100dvh] flex-col xl:ml-[var(--shell-sidebar-width)]">
        {/* TopBar: compact on mobile, full card on desktop */}
        <TopBar isMobileNavOpen={isMobileNavOpen} onToggleMobileNav={toggleMobileNav} />

        {/* Page content */}
        <main
          className="flex-1 px-4 pb-8 pt-4 sm:px-5 sm:pb-10 xl:px-8 xl:pb-12 xl:pt-6 2xl:px-10 animate-[settle-in_520ms_var(--ease-standard)_both]"
          aria-label={currentItem?.label ?? 'Conteúdo principal'}
        >
          <div className="mx-auto w-full max-w-[2040px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
