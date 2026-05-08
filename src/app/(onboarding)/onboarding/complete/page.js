// src/app/(onboarding)/onboarding/complete/page.js
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Hani } from '@/components/hani/Hani'

function getLevelLabel(writingLevel) {
  if (writingLevel === '1') return '입문'
  if (writingLevel === '2') return '가벼운 기록'
  if (writingLevel === '3') return '일상 기록'
  if (writingLevel === '4') return '익숙함'
  return '입문'
}

function parseStoredGoals(value) {
  if (!value) return ['습관', '표현력']

  try {
    const goals = JSON.parse(value)
    return Array.isArray(goals) && goals.length > 0 ? goals : ['습관', '표현력']
  } catch {
    return ['습관', '표현력']
  }
}

export default function OnboardingCompletePage() {
  const nickname = '글쓴이'
  const [summary, setSummary] = useState({ goals: ['습관', '표현력'], writingLevel: '1' })

  useEffect(() => {
    window.queueMicrotask(() => {
      const storedGoals = window.localStorage.getItem('han-geul:onboarding:goals')
      const storedWritingLevel = window.localStorage.getItem('han-geul:onboarding:writingLevel')

      setSummary({
        goals: parseStoredGoals(storedGoals),
        writingLevel: storedWritingLevel ?? '1',
      })
    })
  }, [])

  return (
    <section className="flex min-h-dvh flex-col bg-transparent px-6 pb-6 text-center animate-fade-in">
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-hani-drop">
          <Hani pose="cheering" face="happy" size={224} animate="none" />
        </div>

        <h1 className="mt-8 font-title text-[28px] font-bold leading-[1.4] text-ink">
          준비가 됐어요!
        </h1>

        <div className="mt-7 rounded-[20px] border border-[#E8E2D9] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="whitespace-pre-line font-hani-bubble text-[17px] leading-[1.65] text-ink">
            {`${nickname}님의 공간이\n준비됐어요.\n오늘 첫 글자를\n써볼까요?`}
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-[#E8E2D9] bg-[#F5F0E8] px-3 py-1.5 font-body text-xs font-medium text-ink/70">
            목적: {summary.goals.slice(0, 2).join('+')}
          </span>
          <span className="rounded-full border border-[#E8E2D9] bg-[#F5F0E8] px-3 py-1.5 font-body text-xs font-medium text-ink/70">
            {getLevelLabel(summary.writingLevel)}
          </span>
        </div>
      </main>

      <footer className="border-t border-[#E8E2D9]/80 pt-4">
        <Link
          href="/write"
          className="flex h-14 w-full items-center justify-center rounded-[16px] bg-[#003478] font-body text-base font-bold text-white transition-transform duration-150 active:scale-[0.98]"
        >
          첫 글 쓰러 가기 →
        </Link>
        <Link
          href="/"
          className="mt-4 block font-body text-sm font-medium text-[#9E9590]"
        >
          나중에 쓸게요
        </Link>
      </footer>
    </section>
  )
}
