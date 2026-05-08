// src/app/(onboarding)/onboarding/step1/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const goalOptions = [
  { id: 'habit', icon: '🗓', title: '매일 글', subtitle: '쓰는 습관', summary: '습관' },
  { id: 'expression', icon: '✍️', title: '표현력', subtitle: '키우기', summary: '표현력' },
  { id: 'vocab', icon: '📖', title: '어휘력', subtitle: '키우기', summary: '어휘력' },
  { id: 'collect', icon: '📚', title: '나만의 글', subtitle: '모으기', summary: '글 모으기' },
]

export default function OnboardingStep1Page() {
  const router = useRouter()
  const [selectedGoals, setSelectedGoals] = useState([])

  const canContinue = selectedGoals.length > 0

  const toggleGoal = (goalId) => {
    setSelectedGoals((currentGoals) => (
      currentGoals.includes(goalId)
        ? currentGoals.filter((currentGoal) => currentGoal !== goalId)
        : [...currentGoals, goalId]
    ))
  }

  const goToStep2 = () => {
    if (!canContinue) return

    const summaries = goalOptions
      .filter((goal) => selectedGoals.includes(goal.id))
      .map((goal) => goal.summary)

    window.localStorage.setItem('han-geul:onboarding:goals', JSON.stringify(summaries))
    router.push('/onboarding/step2')
  }

  return (
    <section className="flex min-h-dvh flex-col bg-transparent px-6 pb-6 animate-fade-in">
      <header className="pt-5">
        <div className="flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E8E2D9]">
            <div className="h-full rounded-full bg-[#003478]" style={{ width: '33%' }} />
          </div>
          <span className="font-body text-sm font-medium text-ink/65">1 / 3</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center">
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Hani pose="thinking" face="thinking" size={112} animate="float" />

          <div className="rounded-[20px] border border-[#E8E2D9] bg-white px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="whitespace-pre-line font-hani-bubble text-[21px] leading-[1.55] text-ink">
              {`어떤 글을 써보고\n싶으세요?`}
            </p>
          </div>

          <p className="font-body text-sm text-ink/60">여러 개 선택할 수 있어요.</p>
        </div>

        <div className="mt-9 grid w-full grid-cols-2 gap-3">
          {goalOptions.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id)

            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => toggleGoal(goal.id)}
                className={cn(
                  'relative flex min-h-[112px] flex-col items-start justify-between rounded-[16px] border-[1.5px] bg-white p-4 text-left font-body text-ink shadow-[0_8px_24px_rgba(0,0,0,0.035)] transition-colors duration-150',
                  isSelected ? 'border-2 border-[#003478] bg-[#EEF2FA]' : 'border-[#E8E2D9]',
                )}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#003478] text-[12px] leading-none text-white" aria-hidden="true">
                    ✓
                  </span>
                )}
                <span className="text-2xl leading-none" aria-hidden="true">{goal.icon}</span>
                <span className="font-body text-[16px] font-bold leading-[1.45]">
                  {goal.title}<br />{goal.subtitle}
                </span>
              </button>
            )
          })}
        </div>
      </main>

      <footer className="border-t border-[#E8E2D9]/80 pt-4">
        <p className="mb-3 font-body text-sm font-medium text-ink/70">{selectedGoals.length}개 선택됨</p>
        <button
          type="button"
          onClick={goToStep2}
          disabled={!canContinue}
          className={cn(
            'flex h-14 w-full items-center justify-center rounded-[16px] bg-[#003478] font-body text-base font-bold text-white transition-opacity duration-150',
            canContinue ? 'active:scale-[0.98]' : 'cursor-not-allowed opacity-40',
          )}
        >
          다음 →
        </button>
      </footer>
    </section>
  )
}
