// src/components/layout/BottomTabBar.js
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import { BOTTOM_TABS } from '@/utils/constants'

// 아이콘 컴포넌트 (SVG 인라인 — 이미지 의존 없음)
function TabIcon({ icon, active }) {
  const color = active ? '#003478' : '#3A3530'
  const opacity = active ? '1' : '0.4'

  const icons = {
    home: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
          fill={color}
          opacity={opacity}
        />
      </svg>
    ),
    explore: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" opacity={opacity} />
        <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={opacity} />
      </svg>
    ),
    library: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4"  y="3" width="4" height="18" rx="1" fill={color} opacity={opacity} />
        <rect x="10" y="3" width="4" height="18" rx="1" fill={color} opacity={opacity} />
        <rect x="16" y="3" width="4" height="18" rx="1" fill={color} opacity={opacity} />
      </svg>
    ),
    mypage: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill={color} opacity={opacity} />
        <path
          d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20"
          stroke={color} strokeWidth="2" strokeLinecap="round" opacity={opacity}
        />
      </svg>
    ),
  }

  return icons[icon] ?? null
}

export function BottomTabBar() {
  const pathname = usePathname()

  // 글쓰기 화면에서는 탭바 숨김
  const hideOn = ['/write', '/copying', '/self-writing', '/book-write']
  if (hideOn.some(path => pathname.startsWith(path))) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6EE] border-t border-[#3A3530]/10">
      <ul className="flex items-center justify-around max-w-lg mx-auto h-16 px-2">
        {BOTTOM_TABS.map(({ href, label, icon }) => {
          const isActive = pathname === href ||
            (href !== '/' && pathname.startsWith(href))

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-1 py-2 w-full"
              >
                <TabIcon icon={icon} active={isActive} />
                <span
                  className={cn(
                    'text-[10px] font-body transition-colors',
                    isActive
                      ? 'text-[#003478] font-medium'
                      : 'text-[#3A3530]/40'
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
