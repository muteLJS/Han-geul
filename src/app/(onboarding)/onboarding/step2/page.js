// src/app/(onboarding)/onboarding/step2/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const writingLevelOptions = [
  '😰 거의 써본 적 없어요',
  '📝 가끔 메모나 일기를 써요',
  '💬 블로그나 SNS에 써요',
  '✨ 글쓰기가 익숙해요',
]

export default function OnboardingStep2Page() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState('')

  const handleSelect = (level) => {
    if (selectedLevel) return

    setSelectedLevel(level)
    window.setTimeout(() => {
      router.push('/onboarding/step3')
    }, 500)
  }

  return (
    <section className="flex min-h-dvh flex-col bg-[#FAF6EE] px-6 pb-6 animate-fade-in">
      <div className="-mx-6 h-1 bg-black/10">
        <div className="h-full bg-[#003478]" style={{ width: '66%' }} />
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="mt-20 flex flex-col items-center gap-5 text-center">
          <Hani pose="thinking" face="thinking" size={120} animate="float" />

          <div className="rounded-3xl bg-white px-6 py-4 shadow-sm">
            <p className="font-body text-lg font-bold text-ink">
              평소 글쓰기가 어떻게 느껴지나요?
            </p>
          </div>

          <p className="font-body text-sm text-ink/60">
            솔직하게 골라주세요. 정답이 없어요.
          </p>
        </div>

        <div className="mt-10 flex w-full flex-col gap-3">
          {writingLevelOptions.map((level) => {
            const isSelected = selectedLevel === level

            return (
              <button
                key={level}
                type="button"
                onClick={() => handleSelect(level)}
                disabled={Boolean(selectedLevel)}
                className={cn(
                  'h-16 rounded-2xl border-2 bg-white px-5 text-left font-body text-base font-bold text-ink shadow-sm transition-colors',
                  isSelected && 'border-[#003478] bg-[#EEF2FF]',
                  !isSelected && 'border-transparent hover:border-black/10',
                  selectedLevel && !isSelected && 'opacity-60',
                )}
              >
                {level}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
