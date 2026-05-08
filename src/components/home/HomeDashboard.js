// src/components/home/HomeDashboard.js
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const DAILY_GOAL = 100
const PURE_WORD = {
  word: '노을',
  type: '명사',
  meaning: '해가 질 무렵, 하늘이 붉게 물드는 현상',
  example: '저녁 노을이 온 하늘을 붉게 물들였다.',
}

const practiceItems = [
  { href: '/vocabulary', icon: '📖', title: '어휘', subtitle: '2단계' },
  { href: '/copying', icon: '✍️', title: '필사', subtitle: '봄날소묘' },
  { href: '/self-writing', icon: '✂️', title: '다듬기', subtitle: '낱말' },
]

const goldParticles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 17) % 84)}%`,
  delay: `${(index % 7) * 0.11}s`,
  size: `${6 + (index % 3) * 2}px`,
}))

function getTodayLabel() {
  const now = new Date()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  return `${now.getMonth() + 1}/${now.getDate()}${dayNames[now.getDay()]}`
}

function getHomeState({ todayWordCount, totalWritingCount }) {
  const now = new Date()
  const isAchieved = todayWordCount >= DAILY_GOAL
  const isCrisis = todayWordCount === 0 && now.getHours() >= 20
  const isFirstDay = totalWritingCount === 0 && todayWordCount === 0 && !isCrisis

  if (isAchieved) return 'achieved'
  if (isCrisis) return 'crisis'
  if (isFirstDay) return 'firstDay'
  return 'default'
}

function getGreeting({ state, nickname }) {
  if (state === 'achieved') {
    return `오늘 목표를 채웠어요! 🎉\n더 쓰고 싶으면 계속해도 좋아요.`
  }

  if (state === 'crisis') {
    return `오늘 아직 글을 쓰지 않았어요.\n자정 전에 한 자만 써봐요.`
  }

  if (state === 'firstDay') {
    return `환영해요, ${nickname}님!\n오늘 첫 글자를 써봐요.`
  }

  return `오늘 첫 글자를\n써볼까요?`
}

function ProgressCircle({ value, state }) {
  const color = state === 'achieved' ? '#D4A853' : '#003478'

  return (
    <div
      className="flex h-[74px] w-[74px] items-center justify-center rounded-full"
      style={{ background: `conic-gradient(${color} ${value * 3.6}deg, #E8E2D9 0deg)` }}
      aria-label={`달성률 ${value}%`}
    >
      <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white font-body text-sm font-bold text-ink">
        {value}%
      </div>
    </div>
  )
}

function HomeHeader() {
  return (
    <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="font-title text-xl font-bold text-ink">한-글</h1>
        <div className="flex items-center gap-2 font-body text-sm font-medium text-ink/65">
          <Link href="/notifications" aria-label="알림">🔔</Link>
          <span>{getTodayLabel()}</span>
        </div>
      </div>
    </header>
  )
}

function HaniMessageCard({ state, nickname }) {
  const now = new Date()
  const hourLabel = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}시`

  return (
    <section
      className={cn(
        'mt-5 rounded-[20px] border border-[#E8E2D9] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]',
        state === 'crisis' && 'bg-[#FFF3E0]',
      )}
    >
      <p className="whitespace-pre-line font-hani-bubble text-[21px] leading-[1.55] text-ink">
        {getGreeting({ state, nickname })}
      </p>
      <div className="mt-2 flex items-end justify-between">
        <span className="font-body text-xs text-ink/45">{hourLabel}</span>
        <Hani
          pose={state === 'achieved' ? 'cheering' : 'thinking'}
          face={state === 'achieved' ? 'happy' : 'thinking'}
          size={72}
          animate="float"
        />
      </div>
    </section>
  )
}

function WritingGoalCard({ state, todayWordCount }) {
  const count = state === 'firstDay' ? 0 : todayWordCount
  const progress = Math.min(100, Math.round((count / DAILY_GOAL) * 100))
  const remaining = Math.max(0, DAILY_GOAL - count)
  const isAchieved = state === 'achieved'
  const color = isAchieved ? '#D4A853' : '#003478'

  return (
    <section
      className={cn(
        'mt-5 rounded-[20px] border border-[#E8E2D9] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]',
        isAchieved && 'border-[1.5px] border-[#D4A853]',
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-title text-base font-bold text-ink">오늘의 글쓰기</h2>
        <span
          className={cn(
            'rounded-full border border-[#E8E2D9] px-3 py-1 font-body text-xs font-bold text-ink/70',
            isAchieved && 'border-[#D4A853] bg-[#FFF7E3] text-[#8A5B16]',
          )}
        >
          {isAchieved ? '🎉 달성!' : '목표100자'}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-title text-[42px] font-bold leading-none text-ink">{count}</p>
          <p className="mt-1 font-body text-base font-medium text-ink/60">/ 100자</p>
        </div>
        <ProgressCircle value={progress} state={state} />
      </div>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#E8E2D9]">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between font-body text-xs text-ink/55">
        <span>오늘 {count}자 작성</span>
        <span>{remaining}자 남음</span>
      </div>
    </section>
  )
}

function PureKoreanWordCard({ checked, onCheck }) {
  return (
    <section
      className={cn(
        'mt-5 rounded-[20px] border border-l-[4px] border-[#E8E2D9] border-l-[#003478] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]',
        checked && 'border-l-[#4CAF50]',
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-title text-base font-bold text-ink">오늘의 순우리말</h2>
        <span className="font-body text-xs text-ink/45">{getTodayLabel().replace(/.$/, '일')}</span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <strong className="font-title text-[28px] font-bold text-ink">{PURE_WORD.word}</strong>
        <span className="rounded-full border border-[#E8E2D9] px-2.5 py-1 font-body text-xs text-ink/60">{PURE_WORD.type}</span>
      </div>
      <p className="mt-3 font-body text-sm leading-[1.75] text-ink/75">{PURE_WORD.meaning}</p>
      <p className="mt-3 border-l-2 border-[#E8E2D9] pl-3 font-body text-sm leading-[1.7] text-ink/55">
        {PURE_WORD.example}
      </p>

      <button
        type="button"
        onClick={onCheck}
        disabled={checked}
        className={cn(
          'mt-5 flex h-11 w-full items-center justify-center rounded-[14px] font-body text-sm font-bold transition-transform duration-150 active:scale-[0.98]',
          checked ? 'cursor-default bg-[#E8E2D9] text-ink/55' : 'bg-[#003478] text-white',
        )}
      >
        {checked ? '확인 완료 ✓' : '오늘의 단어 확인 +2pt'}
      </button>
    </section>
  )
}

function WriteCtaCard({ state, todayWordCount }) {
  const isAchieved = state === 'achieved'
  const isCrisis = state === 'crisis'
  const subtitle = isAchieved
    ? '오늘 목표 달성! 더 써볼까요?'
    : isCrisis
      ? '스트릭 12일 · 오늘 마감 전에 써요'
      : `오늘 ${todayWordCount}자 작성했어요`

  return (
    <Link
      href="/write"
      className={cn(
        'mt-5 flex min-h-[84px] items-center justify-between rounded-[20px] px-5 py-4 text-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-transform duration-150 active:scale-[0.98]',
        isAchieved && 'bg-[linear-gradient(135deg,#D4A853,#D4A853)]',
        isCrisis && 'bg-[#E65100]',
        !isAchieved && !isCrisis && 'bg-[#003478]',
      )}
    >
      <div>
        <p className="font-title text-base font-bold">오늘의 글 쓰기 →</p>
        <p className="mt-1 font-body text-xs text-white/75">{subtitle}</p>
      </div>
      <Hani pose="holding" face="happy" size={60} animate="none" />
    </Link>
  )
}

function PracticeSection() {
  return (
    <section className="mt-7">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-title text-base font-bold text-ink">연습하기</h2>
        <Link href="/vocabulary" className="font-body text-xs text-ink/45">전체&gt;</Link>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
        {practiceItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="min-w-[108px] rounded-[16px] border border-[#E8E2D9] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.035)]"
          >
            <span className="text-2xl" aria-hidden="true">{item.icon}</span>
            <p className="mt-3 font-body text-sm font-bold text-ink">{item.title}</p>
            <p className="mt-1 font-body text-xs text-ink/50">{item.subtitle}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function StreakCard({ state }) {
  const isCrisis = state === 'crisis'
  const isFirstDay = state === 'firstDay'
  const streak = isFirstDay ? 0 : 12
  const week = ['월', '화', '수', '목', '금', '토', '일']

  return (
    <section
      className={cn(
        'mt-6 rounded-[20px] border border-[#E8E2D9] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]',
        isCrisis && 'border-[1.5px] border-[#FF9800]',
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-title text-base font-bold text-ink">연속 작성</h2>
        <span aria-hidden="true">🔥</span>
      </div>

      {isCrisis && (
        <p className="mt-3 rounded-[12px] bg-[#FFF3E0] px-3 py-2 font-body text-xs font-bold text-[#E65100]">
          오늘 글을 쓰지 않으면 스트릭이 끊겨요!
        </p>
      )}

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="font-title text-[42px] font-bold leading-none text-ink">{streak}</p>
          <p className="mt-1 font-body text-sm font-medium text-ink/60">일 연속</p>
        </div>
        <div className="text-right">
          <p className="font-body text-xs text-ink/50">최고 15일</p>
          <div className="mt-3 h-2 w-28 overflow-hidden rounded-full bg-[#E8E2D9]">
            <div className="h-full rounded-full bg-[#003478]" style={{ width: isFirstDay ? '0%' : '80%' }} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-2 text-center">
        {week.map((day, index) => {
          const filled = !isFirstDay && index < 3
          const isToday = isCrisis && index === 3

          return (
            <div key={day}>
              <p className="font-body text-[11px] text-ink/45">{day}</p>
              <span
                className={cn(
                  'mx-auto mt-2 block h-3 w-3 rounded-full bg-[#E8E2D9]',
                  filled && 'bg-[#003478]',
                  isToday && 'border border-dashed border-[#FF9800] bg-transparent',
                )}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

function PointCard({ state, points }) {
  const isFirstDay = state === 'firstDay'

  return (
    <section className="mt-6 rounded-[20px] bg-[#1A1A2E] p-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <h2 className="font-title text-base font-bold">내 포인트</h2>
        <Link href="/mypage" className="font-body text-xs text-white/60">내역 보기 &gt;</Link>
      </div>
      <p className="mt-4 font-title text-[28px] font-bold">
        {(isFirstDay ? 0 : points).toLocaleString()}pt
        <span className="mx-3 font-body text-sm font-normal text-white/35">|</span>
        <span className="font-body text-sm font-bold text-[#D4A853]">오늘 +{isFirstDay ? 0 : 32}pt</span>
      </p>
      <Link href="/hani" className="mt-3 block font-body text-sm text-white/70">
        {isFirstDay ? '글을 쓰면 포인트를 받아요 →' : '포인트로 한이를 꾸며보세요&gt;'}
      </Link>
    </section>
  )
}

function GoldToast({ show }) {
  if (!show) return null

  return (
    <div className="fixed left-1/2 top-6 z-[100] -translate-x-1/2 rounded-full bg-[#D4A853] px-5 py-3 font-body text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-fade-in">
      +2pt 획득!
    </div>
  )
}

function Confetti({ show }) {
  if (!show) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 mx-auto max-w-lg overflow-hidden" aria-hidden="true">
      {goldParticles.map((particle) => (
        <span
          key={particle.id}
          className="absolute top-[-16px] block rounded-sm bg-[#D4A853] animate-gold-confetti"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

export function HomeDashboard({ nickname = '글쓴이', todayWordCount = 87, totalWritingCount = 1, points = 1240 }) {
  const [wordChecked, setWordChecked] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const state = useMemo(
    () => getHomeState({ todayWordCount, totalWritingCount }),
    [todayWordCount, totalWritingCount],
  )

  useEffect(() => {
    window.queueMicrotask(() => {
      setWordChecked(window.localStorage.getItem('han-geul:home:pure-word-checked') === getTodayLabel())
    })
  }, [])

  useEffect(() => {
    if (state !== 'achieved') return undefined

    const hasShown = window.sessionStorage.getItem('han-geul:home:goal-confetti') === 'shown'
    if (hasShown) return undefined

    window.sessionStorage.setItem('han-geul:home:goal-confetti', 'shown')
    const showTimer = window.setTimeout(() => setShowConfetti(true), 0)
    const hideTimer = window.setTimeout(() => setShowConfetti(false), 2000)
    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [state])

  const handleWordCheck = () => {
    if (wordChecked) return

    window.localStorage.setItem('han-geul:home:pure-word-checked', getTodayLabel())
    setWordChecked(true)
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2000)
  }

  const displayWordCount = state === 'firstDay' ? 0 : todayWordCount

  return (
    <>
      <HomeHeader />
      <Confetti show={showConfetti} />
      <GoldToast show={showToast} />

      <HaniMessageCard state={state} nickname={nickname} />
      <WritingGoalCard state={state} todayWordCount={displayWordCount} />
      <PureKoreanWordCard checked={wordChecked} onCheck={handleWordCheck} />
      <WriteCtaCard state={state} todayWordCount={displayWordCount} />
      <PracticeSection />
      <StreakCard state={state} />
      <PointCard state={state} points={points} />
    </>
  )
}
