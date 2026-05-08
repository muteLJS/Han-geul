// src/app/(onboarding)/onboarding/step2/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const writingLevelOptions = [
  { value: 1, label: '😰 거의 써본 적 없어요' },
  { value: 2, label: '📝 가끔 메모나 일기를 써요' },
  { value: 3, label: '💬 블로그나 SNS에 써요' },
  { value: 4, label: '✨ 글쓰기가 익숙해요' },
]

export default function OnboardingStep2Page() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState(null)

  const handleSelect = (level) => {
    if (selectedLevel) return

    setSelectedLevel(level)
    window.localStorage.setItem('han-geul:onboarding:writingLevel', String(level))
    window.setTimeout(() => {
      router.push('/onboarding/step3')
    }, 400)
  }

  return (
    <section className="flex min-h-dvh flex-col bg-transparent px-6 pb-6 animate-fade-in">
      <header className="pt-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="뒤로가기"
            className="flex h-9 w-7 items-center justify-start font-body text-2xl text-ink"
          >
            ←
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E8E2D9]">
            <div className="h-full rounded-full bg-[#003478]" style={{ width: '66%' }} />
          </div>
          <span className="font-body text-sm font-medium text-ink/65">2 / 3</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center">
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <div className="rotate-[-2deg]">
            <Hani pose="thinking" face="thinking" size={112} animate="float" />
          </div>

          <div className="rounded-[20px] border border-[#E8E2D9] bg-white px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="whitespace-pre-line font-hani-bubble text-[21px] leading-[1.55] text-ink">
              {`평소 글쓰기가 어떻게\n느껴지나요?`}
            </p>
          </div>

          <div className="font-body text-sm leading-[1.7] text-ink/60">
            <p>솔직하게 골라주세요.</p>
            <p>정답이 없어요.</p>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3">
          {writingLevelOptions.map((option) => {
            const isSelected = selectedLevel === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                disabled={Boolean(selectedLevel)}
                className={cn(
                  'relative flex min-h-[58px] items-center rounded-[16px] border-[1.5px] border-[#E8E2D9] bg-white px-5 text-left font-body text-[15px] font-bold leading-[1.55] text-ink shadow-[0_8px_24px_rgba(0,0,0,0.035)] transition-colors duration-150',
                  isSelected && 'border-2 border-[#003478] bg-[#EEF2FA] pl-6 before:absolute before:left-0 before:top-3 before:h-[calc(100%-24px)] before:w-1 before:rounded-r-full before:bg-[#003478]',
                  selectedLevel && !isSelected && 'opacity-60',
                )}
                aria-pressed={isSelected}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <p className="mt-5 font-body text-xs text-ink/45">선택 즉시 자동으로 다음 이동</p>
      </main>
    </section>
  )
}
