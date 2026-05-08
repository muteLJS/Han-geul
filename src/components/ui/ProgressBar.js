// src/components/ui/ProgressBar.js
import { cn } from '@/utils/cn'

export function ProgressBar({ value = 0, skeleton = false, className }) {
  const clamped = Math.min(100, Math.max(0, value))
  if (skeleton) return <div className={cn('h-1.5 overflow-hidden rounded-full bg-[#E8E2D9]', className)}><div className="h-full w-1/2 animate-skeleton-pulse rounded-full bg-[#FAF6EE]" /></div>
  return (
    <div className={cn('h-1.5 overflow-hidden rounded-full bg-[#E8E2D9]', clamped >= 100 && 'animate-progress-complete', className)}>
      <div className="h-full rounded-full transition-[width] duration-[400ms] ease-out" style={{ width: `${clamped}%`, backgroundColor: clamped >= 100 ? '#D4A853' : '#003478' }} />
    </div>
  )
}

export function StepProgress({ current = 1, total = 5 }) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
      {Array.from({ length: total }, (_, index) => {
        const step = index + 1
        return <span key={step} className={cn('h-1 rounded-full', step < current && 'bg-[#003478]', step === current && 'bg-[#003478]/50', step > current && 'bg-[#E8E2D9]')} />
      })}
    </div>
  )
}
