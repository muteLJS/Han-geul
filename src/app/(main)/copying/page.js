// src/app/(main)/copying/page.js
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'

const originalText = '봄이 오면 산에 들에\n진달래 피네.\n진달래 피는 곳에\n내 마음도 피어납니다.'
const previewText = '봄이 오면 산에 들에\n진달래 피네.\n진달래 피는 곳에...'

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

function Intro({ onStart, onBack }) {
  return (
    <section className="min-h-dvh">
      <TopBar title="오늘의 필사" onBack={onBack} />
      <main className="pt-8">
        <article className="rounded-[20px] border border-[#E8E2D9] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <span className="rounded-full bg-[#EEF2FA] px-3 py-1 font-body text-xs font-bold text-[#003478]">[1단계]</span>
          <h2 className="mt-6 font-title text-xl font-bold text-ink">봄날의 소묘</h2>
          <p className="mt-2 font-body text-[13px] text-[#9E9590]">박완서</p>
          <p className="mt-6 whitespace-pre-line font-title text-base leading-[1.8] text-ink/75">“{previewText}”</p>
          <p className="mt-6 font-body text-xs text-[#9E9590]">총 42자 · 예상 3분</p>
        </article>

        <div className="mt-8 flex items-center gap-3">
          <Hani pose="holding" face="default" size={68} animate="none" />
          <p className="whitespace-pre-line font-hani-bubble text-[19px] leading-[1.6] text-ink">{`천천히 따라 써봐요.\n서두르지 않아도 돼요.`}</p>
        </div>

        <button type="button" onClick={onStart} className="mt-8 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white">
          필사 시작하기 →
        </button>
      </main>
    </section>
  )
}

function findFirstMismatch(input) {
  const compactOriginal = originalText
  for (let index = 0; index < input.length; index += 1) {
    if (input[index] !== compactOriginal[index]) return index
  }
  return -1
}

function CopyingEditor({ onBack, onComplete }) {
  const [text, setText] = useState('')
  const [showHint, setShowHint] = useState(false)
  const hintTimerRef = useRef(null)
  const mismatchIndex = useMemo(() => findFirstMismatch(text), [text])
  const progress = Math.min(100, Math.round((text.length / originalText.length) * 100))
  const wrongChar = mismatchIndex >= 0 ? originalText[mismatchIndex] : ''

  useEffect(() => () => window.clearTimeout(hintTimerRef.current), [])

  const handleChange = (event) => {
    const nextText = event.target.value
    setText(nextText)
    setShowHint(false)
    window.clearTimeout(hintTimerRef.current)

    const nextMismatch = findFirstMismatch(nextText)
    if (nextMismatch >= 0) {
      hintTimerRef.current = window.setTimeout(() => setShowHint(true), 500)
    }

    if (nextText.length >= originalText.length) {
      window.setTimeout(onComplete, 500)
    }
  }

  return (
    <section className="min-h-dvh">
      <TopBar title="오늘의 필사" onBack={onBack} />
      <div className="-mx-4 border-b border-[#E8E2D9] px-4 py-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#E8E2D9]"><div className="h-full rounded-full bg-[#003478]" style={{ width: `${progress}%` }} /></div>
        <p className="mt-2 font-body text-xs text-ink/45">진행바 {progress}%</p>
      </div>
      <main className="pt-7">
        <section className="rounded-[16px] bg-[#F5F0E8] px-5 py-4">
          <h2 className="mb-4 font-body text-xs text-ink/45">── 원문 ─────────────────</h2>
          <p className="whitespace-pre-line font-title text-[15px] leading-[1.8] text-[#6B6560]">{originalText}</p>
        </section>

        <div className="my-6 border-t border-dashed border-[#9E9590]/45" />

        <section className="px-5 py-4">
          <h2 className="mb-4 font-body text-xs text-ink/45">── 필사 ─────────────────</h2>
          <textarea
            value={text}
            onChange={handleChange}
            autoFocus
            placeholder="원문을 천천히 따라 써보세요."
            className="min-h-[30dvh] w-full resize-none bg-transparent font-title text-[15px] leading-[1.8] text-ink outline-none placeholder:text-ink/30"
          />
          {mismatchIndex >= 0 && (
            <p className="mt-2 font-body text-xs text-[#CD2E3A] underline decoration-[#CD2E3A] decoration-2 underline-offset-4">
              {text.slice(Math.max(0, mismatchIndex - 4), mismatchIndex)}[{text[mismatchIndex]}] 이후를 확인해보세요.
            </p>
          )}
          {showHint && (
            <div className="mt-5 rounded-[16px] border border-[#D4A853] bg-[#FFF8E7] p-4 font-body text-sm leading-[1.7] text-ink/70">
              <strong className="text-[#8A5B16]">⚠️ “{wrongChar}”가 맞아요.</strong><br />계속 써도 괜찮아요.
            </div>
          )}
        </section>
      </main>
    </section>
  )
}

function Complete({ onBack }) {
  const [note, setNote] = useState('')
  return (
    <section className="flex min-h-dvh flex-col py-8 text-center">
      <main className="flex-1">
        <Hani pose="cheering" face="happy" size={134} animate="none" />
        <p className="mt-5 font-hani-bubble text-[18px] text-ink">오늘의 필사를 마쳤어요.</p>
        <div className="mt-7 rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="flex justify-between font-body text-sm text-ink/70"><span>완료 시간</span><strong>3분 12초</strong></p>
          <p className="mt-2 flex justify-between font-body text-sm text-ink/70"><span>오타율</span><strong>2%</strong></p>
          <p className="mt-2 flex justify-between font-body text-sm text-ink/70"><span>획득 포인트</span><strong className="text-[#D4A853]">+5pt</strong></p>
        </div>
        <p className="mt-7 font-body text-sm leading-[1.8] text-ink/60">오늘 필사한 문장이<br />손에 남았을 거예요.</p>
      </main>
      <footer className="border-t border-[#E8E2D9] pt-5 text-left">
        <h2 className="font-title text-base font-bold text-ink">한 줄 감상 <span className="font-body text-sm font-normal text-ink/45">(선택)</span></h2>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="오늘 필사하며 어떤 문장이 기억에 남았나요?" className="mt-3 min-h-24 w-full rounded-[16px] border border-[#E8E2D9] bg-white p-4 font-body text-sm leading-[1.7] outline-none placeholder:text-ink/35" />
        <p className="mt-2 text-right font-body text-xs font-bold text-[#D4A853]">+3pt</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" onClick={onBack} className="h-14 rounded-[16px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">건너뛰기</button>
          <button type="button" onClick={onBack} className="h-14 rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">저장 +3pt</button>
        </div>
      </footer>
    </section>
  )
}

export default function CopyingPage() {
  const router = useRouter()
  const [step, setStep] = useState('intro')

  return (
    <PageLayout hasTopBar={false} hasBottomTab={false} className="px-4 pb-0">
      {step === 'intro' && <Intro onStart={() => setStep('editor')} onBack={() => router.push('/vocabulary')} />}
      {step === 'editor' && <CopyingEditor onBack={() => setStep('intro')} onComplete={() => setStep('complete')} />}
      {step === 'complete' && <Complete onBack={() => router.push('/vocabulary')} />}
    </PageLayout>
  )
}
