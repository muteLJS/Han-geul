// src/components/home/ObangButtons.js
import Link from 'next/link'
import { obangButtons } from '@/styles/tokens'
import { cn } from '@/utils/cn'

export function ObangButtons() {
  return (
    <section className="mb-6">
      <p className="text-xs text-[#3A3530]/40 font-body mb-3">무엇을 써볼까요?</p>

      {/* 오방색 5버튼 그리드 */}
      <div className="grid grid-cols-5 gap-2">
        {obangButtons.map((btn) => (
          <Link
            key={btn.key}
            href={btn.href}
            className={cn(
              'flex flex-col items-center justify-center',
              'aspect-square rounded-2xl',
              'text-center text-[11px] font-body font-medium leading-tight',
              'transition-all duration-150 active:scale-95',
              btn.border && 'border border-[#3A3530]/20'
            )}
            style={{
              backgroundColor: btn.bg,
              color:           btn.text,
            }}
          >
            {btn.label.split('\n').map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </Link>
        ))}
      </div>
    </section>
  )
}
