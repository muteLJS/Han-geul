// src/components/layout/BottomTabBar.js
'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/utils/cn'
import { BOTTOM_TABS } from '@/utils/constants'

const TAB_ICONS = {
  home: '🏠',
  write: '✏️',
  practice: '📖',
  library: '📊',
}

function BottomTabBarInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hideOn = ['/write', '/copying', '/self-writing', '/book-write', '/settings', '/notifications', '/hani']
  if (hideOn.some(path => pathname.startsWith(path))) return null
  if (pathname === '/vocabulary' && searchParams.get('view')) return null
  if (pathname === '/library' && searchParams.get('view')) return null
  if (pathname === '/mypage' && searchParams.get('view')) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E2D9] bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto grid h-14 max-w-lg grid-cols-4 px-2">
        {BOTTOM_TABS.map(({ href, label, icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          const isWrite = icon === 'write'

          return (
            <li key={href} className="flex items-stretch justify-center">
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex min-w-[64px] flex-col items-center justify-center gap-0.5 px-2 font-body transition-colors duration-150',
                  isActive ? 'text-[#003478]' : 'text-[#9E9590]',
                )}
              >
                <span
                  className={cn(
                    'flex items-center justify-center leading-none',
                    isWrite ? 'h-9 w-12 text-[28px]' : 'text-[22px]',
                    isWrite && isActive && 'rounded-[12px] bg-[#EEF2FA]',
                  )}
                  aria-hidden="true"
                >
                  {TAB_ICONS[icon]}
                </span>
                <span className="text-[10px] font-bold leading-none">{label || '쓰기'}</span>
                {isActive && <span className="absolute bottom-0 h-0.5 w-8 rounded-full bg-[#003478]" />}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}


export function BottomTabBar() {
  return (
    <Suspense fallback={null}>
      <BottomTabBarInner />
    </Suspense>
  )
}
