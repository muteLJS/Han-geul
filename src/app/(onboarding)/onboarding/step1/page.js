// src/app/(onboarding)/onboarding/step1/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const goalOptions = [
  '매일 글 쓰는 습관',
  '표현력 키우기',
  '어휘력 키우기',
  '나만의 글 모으기',
]

export default function OnboardingStep1Page() {
  const router = useRouter()
  const [selectedGoals, setSelectedGoals] = useState([])

  const canContinue = selectedGoals.length > 0

  const toggleGoal = (goal) => {
    setSelectedGoals((currentGoals) => (
      currentGoals.includes(goal)
        ? currentGoals.filter((currentGoal) => currentGoal !== goal)
        : [...currentGoals, goal]
    ))
  }

  const goToStep2 = () => {
    if (!canContinue) return
    router.push('/onboarding/step2')
  }

  return (
    <section className="flex min-h-dvh flex-col bg-[#FAF6EE] px-6 pb-6 animate-fade-in">
      <div className="-mx-6 h-1 bg-black/10">
        <div className="h-full bg-[#003478]" style={{ width: '33%' }} />
      </div>

      <header className="flex items-center justify-between py-5">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="flex h-10 w-10 items-center justify-center rounded-full font-body text-2xl text-ink transition-colors hover:bg-black/5"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => router.push('/onboarding/step3')}
          className="font-body text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          건너뛰기
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center">
        <div className="mt-8 flex flex-col items-center gap-5 text-center">
          <Hani pose="thinking" face="thinking" size={120} animate="float" />

          <div className="rounded-3xl bg-white px-6 py-4 shadow-sm">
            <p className="font-body text-lg font-bold text-ink">
              어떤 글을 써보고 싶으세요?
            </p>
          </div>

          <p className="font-body text-sm text-ink/60">
            여러 개 선택할 수 있어요.
          </p>
        </div>

        <div className="mt-10 grid w-full grid-cols-2 gap-3">
          {goalOptions.map((goal) => {
            const isSelected = selectedGoals.includes(goal)

            return (
              <button
                key={goal}
                type="button"
                onClick={() => toggleGoal(goal)}
                className={cn(
                  'flex min-h-28 items-center justify-center rounded-2xl border-2 bg-white px-4 text-center font-body text-base font-bold leading-7 text-ink shadow-sm transition-colors',
                  isSelected && 'border-[#003478] bg-[#EEF2FF]',
                  !isSelected && 'border-transparent hover:border-black/10',
                )}
              >
                {goal}
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={goToStep2}
        disabled={!canContinue}
        className={cn(
          'h-14 w-full rounded-2xl bg-[#003478] font-body text-base font-bold text-white transition-opacity',
          canContinue ? 'hover:opacity-90' : 'cursor-not-allowed opacity-40',
        )}
      >
        다음 →
      </button>
    </section>
  )
}
