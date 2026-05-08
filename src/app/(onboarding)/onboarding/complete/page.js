// src/app/(onboarding)/onboarding/complete/page.js
'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Hani } from '@/components/hani/Hani'

const confettiPieces = [
  { left: '8%', top: '10%', char: '✦', color: '#D4A853', size: '18px', delay: '0s' },
  { left: '18%', top: '24%', char: '•', color: '#F28B82', size: '22px', delay: '0.5s' },
  { left: '78%', top: '12%', char: '✧', color: '#003478', size: '20px', delay: '0.2s' },
  { left: '88%', top: '28%', char: '•', color: '#81C995', size: '18px', delay: '0.8s' },
  { left: '12%', top: '58%', char: '✧', color: '#81C995', size: '16px', delay: '1s' },
  { left: '86%', top: '62%', char: '✦', color: '#D4A853', size: '18px', delay: '0.4s' },
  { left: '28%', top: '78%', char: '•', color: '#003478', size: '16px', delay: '1.2s' },
  { left: '72%', top: '82%', char: '•', color: '#F28B82', size: '20px', delay: '0.7s' },
  { left: '45%', top: '14%', char: '•', color: '#81C995', size: '14px', delay: '1.4s' },
  { left: '56%', top: '72%', char: '✧', color: '#D4A853', size: '16px', delay: '0.9s' },
]

export default function OnboardingCompletePage() {
  const { data: session } = useSession()
  const nickname = session?.user?.name ?? '글쓴이'

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#FAF6EE] px-6 py-8 text-center animate-fade-in">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {confettiPieces.map((piece, index) => (
          <span
            key={`${piece.left}-${piece.top}-${index}`}
            className="absolute animate-hani-float font-title font-bold"
            style={{
              left: piece.left,
              top: piece.top,
              color: piece.color,
              fontSize: piece.size,
              animationDelay: piece.delay,
            }}
          >
            {piece.char}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-7">
        <Hani pose="cheering" face="happy" size={160} animate="bounce" />

        <h1 className="font-title text-3xl font-bold text-ink">
          ✦ 준비가 됐어요!
        </h1>

        <div className="rounded-3xl bg-white px-6 py-5 shadow-sm">
          <p className="whitespace-pre-line font-body text-lg font-bold leading-8 text-ink">
            {`${nickname}님의 공간이 준비됐어요.\n오늘 첫 글자를 써볼까요? 🌸`}
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="relative z-10 flex h-14 w-full items-center justify-center rounded-2xl bg-[#003478] font-body text-base font-bold text-white transition-opacity hover:opacity-90"
      >
        시작하기 →
      </Link>
    </section>
  )
}
