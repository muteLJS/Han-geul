// src/app/(main)/notifications/page.js
'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const notifications = [
  {
    id: 'streak-risk',
    group: '오늘',
    icon: '🔥',
    title: '스트릭 위기!',
    body: '오늘 아직 글을 쓰지 않았어요. 자정까지 2시간 남았어요.',
    time: '오후 10시',
    unread: true,
    href: '/library?view=streak',
  },
  {
    id: 'badge',
    group: '오늘',
    icon: '✨',
    title: '뱃지 획득!',
    body: "'30일 연속 작성' 뱃지를 획득했어요!",
    time: '오후 8시',
    unread: true,
    href: '/library?view=badges',
  },
  {
    id: 'write-reminder',
    group: '어제',
    icon: '📝',
    title: '글쓰기 시간이에요',
    body: '오늘도 한 자 써볼까요?',
    time: '오후 8시',
    unread: false,
    href: '/write',
  },
]

const pushSamples = [
  {
    title: '🔥 스트릭이 끊길 것 같아요!',
    body: '오늘 자정까지 2시간 남았어요\n지금 한 자만 써봐요.',
    condition: '오늘 미작성 + 오후 10시 · 스트릭 1일 이상',
    href: '/write',
  },
  {
    title: '✏️ 오늘도 글 쓸 시간이에요',
    body: '글벗이님, 오늘 하루는\n어땠나요?',
    condition: '설정한 알림 시간 · 오늘 미작성',
    href: '/write',
  },
  {
    title: '✨ 새 뱃지를 획득했어요!',
    body: "'30일 연속 작성' 뱃지가\n생겼어요. 확인해보세요!",
    condition: '뱃지 획득 즉시',
    href: '/library?view=badges',
  },
]

const reminderMessages = [
  '오늘도 글 쓸 시간이에요.',
  '오늘 하루는 어땠나요?',
  '한 문장만 써봐요.',
  '오늘의 이야기를 들려주세요.',
  '잠깐, 오늘 글 썼나요?',
]

function TopBar({ empty = false }) {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
      <div className="flex h-7 items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-16 text-left font-body text-sm text-ink">← 뒤로</button>
        <h1 className="flex-1 text-center font-title text-base font-bold text-ink">알림</h1>
        <button type="button" className="w-16 text-right font-body text-xs font-bold text-ink/60">{empty ? '' : '모두읽음'}</button>
      </div>
    </header>
  )
}

function NotificationCard({ item }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'relative mb-2 block rounded-[14px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.035)]',
        item.unread ? 'bg-[#F5F8FF]' : 'bg-white',
      )}
    >
      {item.unread && <span className="absolute left-3 top-5 h-2 w-2 rounded-full bg-[#003478]" aria-hidden="true" />}
      <div className={cn('pl-3', !item.unread && 'pl-0 text-[#9E9590]')}>
        <h2 className="font-body text-sm font-bold">{item.icon} {item.title}</h2>
        <p className="mt-2 font-body text-[13px] leading-[1.5]">{item.body}</p>
        <p className="mt-3 text-right font-body text-xs text-[#9E9590]">{item.time}</p>
      </div>
    </Link>
  )
}

function NotificationList() {
  const groups = ['오늘', '어제']
  return (
    <section className="min-h-dvh pb-6">
      <TopBar />
      <main className="pt-6">
        {groups.map((group) => (
          <section key={group} className="mb-7">
            <h2 className="mb-3 font-title text-base font-bold text-ink">{group}</h2>
            {notifications.filter((item) => item.group === group).map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </section>
        ))}
        <PushPreview />
      </main>
    </section>
  )
}

function EmptyState() {
  return (
    <section className="min-h-dvh">
      <TopBar empty />
      <main className="flex min-h-[72dvh] flex-col items-center justify-center text-center">
        <Hani pose="thinking" face="thinking" size={134} animate="float" />
        <h2 className="mt-8 font-title text-xl font-bold text-ink">아직 알림이 없어요.</h2>
        <p className="mt-4 font-body text-sm leading-[1.7] text-[#6B6560]">
          글을 쓰면 한이가<br />소식을 전해드려요.
        </p>
      </main>
    </section>
  )
}

function PushCard({ sample }) {
  return (
    <Link href={sample.href} className="block rounded-[18px] border border-[#E8E2D9] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
      <p className="font-title text-sm font-bold text-ink">한-글</p>
      <p className="mt-2 font-body text-sm font-bold text-ink">{sample.title}</p>
      <p className="mt-1 whitespace-pre-line font-body text-[13px] leading-[1.5] text-ink/70">{sample.body}</p>
      <p className="mt-3 font-body text-[11px] text-[#9E9590]">발송 조건: {sample.condition}</p>
    </Link>
  )
}

function PushPreview() {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-title text-base font-bold text-ink">푸시 알림 예시</h2>
      <div className="space-y-3">
        {pushSamples.map((sample) => <PushCard key={sample.title} sample={sample} />)}
      </div>
      <section className="mt-5 rounded-[16px] border border-[#E8E2D9] bg-white p-4">
        <h3 className="font-body text-sm font-bold text-ink">글쓰기 리마인더 멘트</h3>
        <ul className="mt-3 space-y-1 font-body text-xs leading-[1.6] text-ink/55">
          {reminderMessages.map((message) => <li key={message}>• {message}</li>)}
        </ul>
      </section>
    </section>
  )
}

function NotificationsPageInner() {
  const searchParams = useSearchParams()
  const empty = searchParams.get('empty') === '1'

  return (
    <PageLayout hasTopBar={false} hasBottomTab={false} className="px-4 pb-0">
      {empty ? <EmptyState /> : <NotificationList />}
    </PageLayout>
  )
}


export default function NotificationsPage() {
  return (
    <Suspense fallback={null}>
      <NotificationsPageInner />
    </Suspense>
  )
}
