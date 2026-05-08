// src/components/ui/LoadingState.js
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

export function FullScreenLoading({ message }) {
  return (
    <div className="hanji-bg flex min-h-dvh flex-col items-center justify-center text-center">
      <Hani pose="thinking" face="thinking" size={90} animate="shake" />
      <div className="mt-6 flex gap-2" aria-label="로딩 중">
        {[0, 1, 2].map((dot) => <span key={dot} className="h-2 w-2 animate-loading-dot rounded-full bg-[#1A1A2E]" style={{ animationDelay: `${dot * 0.4}s` }} />)}
      </div>
      {message && <p className="mt-4 font-body text-sm text-ink/55">{message}</p>}
    </div>
  )
}

export function SkeletonBox({ className }) {
  return <div className={cn('animate-skeleton-pulse rounded-[16px] bg-[#E8E2D9]', className)} />
}
