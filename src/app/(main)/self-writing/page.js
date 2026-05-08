// src/app/(main)/self-writing/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const practiceTypes = [
  { id: 'word', icon: '✂️', title: '낱말 바꾸기', desc: '어색한 단어를 더 나은\n표현으로 바꿔봐요' },
  { id: 'blank', icon: '📝', title: '빈칸 채우기', desc: '문장의 빈칸에 알맞은\n단어를 넣어봐요' },
  { id: 'sentence', icon: '📋', title: '문장 고르기', desc: '상황에 맞는 문장을\n골라봐요' },
]

function TopBar({ title, onBack }) {
  return (
    <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
      <div className="flex h-7 items-center justify-between">
        <button type="button" onClick={onBack} className="w-16 text-left font-body text-sm text-ink">← 뒤로</button>
        <h1 className="flex-1 text-center font-title text-base font-bold text-ink">{title}</h1>
        <span className="w-16" />
      </div>
    </header>
  )
}

function TypeSelect({ onBack, onSelect }) {
  return (
    <section className="min-h-dvh">
      <TopBar title="글 다듬기" onBack={onBack} />
      <main className="pt-9">
        <div className="flex flex-col items-center text-center">
          <Hani pose="default" face="default" size={90} animate="float" />
          <p className="mt-4 font-hani-bubble text-[20px] text-ink">어떤 연습을 해볼까요?</p>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          {practiceTypes.map((type) => (
            <button key={type.id} type="button" onClick={() => onSelect(type.id)} className="rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <p className="font-body text-base font-bold text-ink">{type.icon} {type.title}</p>
              <p className="mt-3 whitespace-pre-line font-body text-sm leading-[1.7] text-ink/55">{type.desc}<span className="float-right text-ink/45">→</span></p>
            </button>
          ))}
        </div>
      </main>
    </section>
  )
}

function Progress({ current = 1, total = 3 }) {
  return (
    <div className="-mx-4 border-b border-[#E8E2D9] px-4 py-3">
      <div className="h-1.5 overflow-hidden rounded-full bg-[#E8E2D9]"><div className="h-full rounded-full bg-[#003478]" style={{ width: `${(current / total) * 100}%` }} /></div>
      <p className="mt-2 font-body text-xs text-ink/45">진행바 {current}/{total}</p>
    </div>
  )
}

function ChoiceButton({ children, selected, tone, onClick }) {
  return (
    <button type="button" onClick={onClick} className={cn('rounded-[10px] bg-[#F5F0E8] px-4 py-3 font-body text-sm font-bold text-ink', selected && tone === 'green' && 'bg-[#E8F5E9] text-[#2E7D32]', selected && tone === 'blue' && 'bg-[#EEF2FA] text-[#003478]')}>
      {children}
    </button>
  )
}

function WordPractice({ onBack, onDone }) {
  const [selected, setSelected] = useState('')
  return (
    <section className="min-h-dvh">
      <TopBar title="낱말 바꾸기" onBack={onBack} />
      <Progress />
      <main className="pt-8">
        <section className="rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="font-title text-lg font-bold leading-[1.6] text-ink">밑줄 친 단어를 더 나은<br />표현으로 바꿔보세요.</p>
          <p className="mt-7 font-title text-lg leading-[1.8] text-ink">“그는 매우 <span className="rounded bg-[#FFF8E7] px-1 underline decoration-[#D4A853] decoration-2 underline-offset-4">좋은</span><br />사람이다”</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {['훌륭한', '착한', '멋진', '예쁜'].map((option) => (
              <ChoiceButton key={option} selected={selected === option} tone={option === '훌륭한' ? 'green' : 'blue'} onClick={() => setSelected(option)}>{option}</ChoiceButton>
            ))}
          </div>
          {selected && <p className={cn('mt-5 font-body text-sm font-bold', selected === '훌륭한' ? 'text-[#4CAF50]' : 'text-[#003478]')}>{selected === '훌륭한' ? '이 표현이 더 자연스러워요.' : '이런 표현도 좋아요.'}</p>}
        </section>
        {selected && <button type="button" onClick={onDone} className="mt-6 h-14 w-full rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">다음 →</button>}
      </main>
    </section>
  )
}

function BlankPractice({ onBack, onDone }) {
  const [selected, setSelected] = useState('')
  return (
    <section className="min-h-dvh">
      <TopBar title="빈칸 채우기" onBack={onBack} />
      <Progress />
      <main className="pt-8">
        <section className="rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="font-title text-lg font-bold leading-[1.6] text-ink">빈칸에 알맞은 단어를<br />골라보세요.</p>
          <p className="mt-7 font-title text-lg leading-[1.8] text-ink">“저녁 <span className="rounded bg-[#EEF2FA] px-2 py-1 text-[#003478]">_____</span> 이 온<br />하늘을 붉게 물들였다”</p>
          <div className="mt-7 flex flex-col gap-3">
            {['노을', '구름', '바람', '빗방울'].map((option, index) => (
              <button key={option} type="button" onClick={() => setSelected(option)} className={cn('min-h-[48px] rounded-[12px] border border-[#E8E2D9] bg-white px-4 text-left font-body text-sm font-bold text-ink', selected === option && 'border-[#003478] bg-[#EEF2FA]')}>
                {['①', '②', '③', '④'][index]} {option}
              </button>
            ))}
          </div>
        </section>
        {selected && <button type="button" onClick={onDone} className="mt-6 h-14 w-full rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">다음 →</button>}
      </main>
    </section>
  )
}

function SentencePractice({ onBack, onDone }) {
  const [selected, setSelected] = useState('')
  const options = ['잘 지내고 있어?\n오랜만이다.', '업무 협조\n요청드립니다', '귀하의 연락을\n기다리겠습니다']
  return (
    <section className="min-h-dvh">
      <TopBar title="문장 고르기" onBack={onBack} />
      <Progress />
      <main className="pt-8">
        <section className="rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="font-title text-lg font-bold leading-[1.6] text-ink">상황에 맞는 문장을<br />골라보세요.</p>
          <div className="mt-6 border-l-[3px] border-[#003478] bg-[#F0EBE0] p-4 text-left">
            <p className="font-body text-sm font-bold text-ink">상황</p>
            <p className="mt-2 font-body text-sm leading-[1.7] text-ink/65">“오랜 친구에게 오랜만에 연락할 때”</p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {options.map((option, index) => (
              <button key={option} type="button" onClick={() => setSelected(option)} className={cn('min-h-[58px] rounded-[12px] border border-[#E8E2D9] bg-white px-4 text-left font-body text-sm font-bold leading-[1.5] text-ink', selected === option && 'border-[#003478] bg-[#EEF2FA]')}>
                {['①', '②', '③'][index]} “{option}”
              </button>
            ))}
          </div>
        </section>
        {selected && <button type="button" onClick={onDone} className="mt-6 h-14 w-full rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">완료 →</button>}
      </main>
    </section>
  )
}

function Complete({ typeLabel, onOther, onHome }) {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center py-8 text-center">
      <Hani pose="cheering" face="happy" size={134} animate="none" />
      <p className="mt-5 font-hani-bubble text-[18px] text-ink">오늘 글 다듬기 완료!</p>
      <div className="mt-7 w-full rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        <p className="flex justify-between font-body text-sm text-ink/70"><span>완료한 유형</span><strong>{typeLabel}</strong></p>
        <p className="mt-2 flex justify-between font-body text-sm text-ink/70"><span>문제 수</span><strong>3문제</strong></p>
        <p className="mt-2 flex justify-between font-body text-sm text-ink/70"><span>획득 포인트</span><strong className="text-[#D4A853]">+5pt</strong></p>
      </div>
      <p className="mt-7 font-body text-sm leading-[1.8] text-ink/60">오늘 연습한 표현들이<br />글에 스며들 거예요.</p>
      <button type="button" onClick={onOther} className="mt-8 h-[52px] w-full rounded-[16px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">다른 유형도 해볼까요?</button>
      <button type="button" onClick={onHome} className="mt-3 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white">홈으로</button>
    </section>
  )
}

export default function SelfWritingPage() {
  const router = useRouter()
  const [view, setView] = useState('types')
  const [type, setType] = useState('word')
  const labels = { word: '낱말 바꾸기', blank: '빈칸 채우기', sentence: '문장 고르기' }

  const selectType = (nextType) => {
    setType(nextType)
    setView(nextType)
  }

  return (
    <PageLayout hasTopBar={false} hasBottomTab={false} className="px-4 pb-0">
      {view === 'types' && <TypeSelect onBack={() => router.push('/vocabulary')} onSelect={selectType} />}
      {view === 'word' && <WordPractice onBack={() => setView('types')} onDone={() => setView('complete')} />}
      {view === 'blank' && <BlankPractice onBack={() => setView('types')} onDone={() => setView('complete')} />}
      {view === 'sentence' && <SentencePractice onBack={() => setView('types')} onDone={() => setView('complete')} />}
      {view === 'complete' && <Complete typeLabel={labels[type]} onOther={() => setView('types')} onHome={() => router.push('/vocabulary')} />}
    </PageLayout>
  )
}
