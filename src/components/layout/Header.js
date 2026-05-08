// src/components/layout/Header.js
'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'

export function Header({
  title,
  logo,
  showBack = true,
  onBack,
  right,
  className,
}) {
  const router = useRouter()
  const handleBack = () => (onBack ? onBack() : router.back())

  return (
    <header className={cn('sticky top-0 z-40 -mx-4 h-[52px] border-b border-[#E8E2D9] bg-[#FAF6EE] px-4 pt-[env(safe-area-inset-top)]', className)}>
      <div className="flex h-[52px] items-center justify-between">
        <div className="flex w-16 items-center justify-start">
          {showBack ? (
            <button type="button" onClick={handleBack} aria-label="뒤로가기" className="font-body text-2xl leading-none text-[#1A1A2E]">←</button>
          ) : (
            <span className="font-title text-xl font-bold text-[#1A1A2E]">{logo}</span>
          )}
        </div>
        <h1 className="min-w-0 flex-1 truncate text-center font-body text-[17px] font-bold text-[#1A1A2E]">{title}</h1>
        <div className="flex w-16 justify-end font-body text-sm font-bold text-[#1A1A2E]">{right}</div>
      </div>
    </header>
  )
}
