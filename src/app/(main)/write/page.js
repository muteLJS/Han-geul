// src/app/(main)/write/page.js
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const DAILY_GOAL = 100
const REFLECT_MIN_CHARS = 300

const categories = [
  { id: 'daily', icon: '📅', title: '일상/감성', subtitle: '일기·수필' },
  { id: 'thought', icon: '💭', title: '생각/표현', subtitle: '에세이·감상' },
  { id: 'purpose', icon: '📋', title: '실용/목적', subtitle: '자소서·기획' },
  { id: 'creative', icon: '✏️', title: '창작', subtitle: '소설·시·동화' },
]

const detailMap = {
  daily: {
    title: '일상/감성',
    items: [
      { icon: '📔', title: '일기', desc: '오늘 하루를 기록해요' },
      { icon: '📝', title: '수필', desc: '생각을 자유롭게 써요' },
      { icon: '✉️', title: '편지', desc: '누군가에게 쓰는 글' },
      { icon: '✏️', title: '기타', desc: '분류 없이 자유롭게' },
    ],
  },
  thought: {
    title: '생각/표현',
    items: [
      { icon: '💭', title: '생각 기록', desc: '마음에 남은 생각을 써요' },
      { icon: '🎬', title: '감상문', desc: '본 것과 느낀 것을 남겨요' },
      { icon: '🧩', title: '질문', desc: '스스로에게 묻고 답해요' },
      { icon: '✏️', title: '기타', desc: '분류 없이 자유롭게' },
    ],
  },
  purpose: {
    title: '실용/목적',
    items: [
      { icon: '📋', title: '자소서', desc: '나를 소개하는 글을 써요' },
      { icon: '🗂', title: '기획', desc: '생각을 목적에 맞게 정리해요' },
      { icon: '📌', title: '메모', desc: '필요한 내용을 간단히 남겨요' },
      { icon: '✏️', title: '기타', desc: '분류 없이 자유롭게' },
    ],
  },
  creative: {
    title: '창작',
    items: [
      { icon: '📚', title: '소설', desc: '장면과 인물을 떠올려요' },
      { icon: '🌿', title: '시', desc: '짧은 감각을 문장으로 남겨요' },
      { icon: '🧸', title: '동화', desc: '따뜻한 이야기를 지어요' },
      { icon: '✏️', title: '기타', desc: '분류 없이 자유롭게' },
    ],
  },
}

const topics = [
  '오늘 가장 기억에 남는 한 장면',
  '오늘 먹은 것 중 가장 맛있었던 것',
  '오늘 누군가에게 하고 싶었던 말',
]

const drafts = [
  { title: '오늘 있었던 일', date: '5월 7일', count: 87 },
  { title: '제목 없음', date: '5월 6일', count: 234 },
]

const papers = [
  { name: '흰색', free: true },
  { name: '한지', free: true },
  { name: '먹지', free: true },
  { name: '줄노트', price: 50 },
  { name: '모눈', price: 50 },
  { name: '꽃', price: 100, locked: true },
]

const fonts = [
  { name: 'Noto Serif KR', sample: '가나다', free: true },
  { name: 'KoPub 바탕', sample: '가나다', free: true },
  { name: '나눔명조', sample: '가나다', free: true },
  { name: '나눔손글씨', sample: '가나다', price: 50 },
  { name: '배달의민족한나', sample: '가나다', price: 80 },
  { name: '제주명조', sample: '가나다', price: 60 },
]

function getWritingHint(level) {
  if (level === '1') return '한 문장부터 시작해도 괜찮아요.\n천천히 써볼까요?'
  if (level === '2') return '오늘 남기고 싶은 장면을\n가볍게 골라볼까요?'
  if (level === '3') return '생각이 잘 이어질 수 있게\n글감을 골라볼게요.'
  if (level === '4') return '오늘은 어떤 결의 글을\n써보고 싶으세요?'
  return '오늘 쓰고 싶은 글을\n골라볼까요?'
}

function nowLabel() {
  const now = new Date()
  const hour = now.getHours()
  const minute = `${now.getMinutes()}`.padStart(2, '0')
  return `${hour < 12 ? '오전' : '오후'} ${hour % 12 || 12}:${minute}`
}

function countChars(text) {
  return text.replace(/\s/g, '').length
}

function TopLine({ title, onBack, close = false }) {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
      <div className="flex h-7 items-center justify-between">
        {close ? (
          <span className="w-12" />
        ) : (
          <button type="button" onClick={onBack} className="w-16 text-left font-body text-sm text-ink">← 뒤로</button>
        )}
        {title && <h1 className="flex-1 text-center font-title text-base font-bold text-ink">{title}</h1>}
        {close ? (
          <Link href="/" className="w-12 text-right font-body text-2xl text-ink" aria-label="닫기">✕</Link>
        ) : (
          <span className="w-16" />
        )}
      </div>
    </header>
  )
}

function Bubble({ children, tone = 'white', className }) {
  return (
    <div className={cn('rounded-[20px] border border-[#E8E2D9] px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]', tone === 'white' ? 'bg-white' : 'bg-[#FFF3E0]', className)}>
      <p className="whitespace-pre-line font-hani-bubble text-[19px] leading-[1.6] text-ink">{children}</p>
    </div>
  )
}

function Sheet({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1A2E]/25 px-0">
      <section className="hanji-bg w-full max-w-lg rounded-t-[20px] border border-[#E8E2D9] px-5 pb-6 pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] animate-fade-in">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#9E9590]/45" />
        <header className="mb-5 flex items-center justify-between">
          <h2 className="font-title text-lg font-bold text-ink">{title}</h2>
          <button type="button" onClick={onClose} className="font-body text-xl text-ink" aria-label="닫기">✕</button>
        </header>
        {children}
      </section>
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="rounded-[16px] border border-[#E8E2D9] bg-white p-5">
          <div className="h-4 w-full animate-pulse rounded bg-[#E8E2D9]" />
        </div>
      ))}
    </div>
  )
}

function CategoryStep({ writingLevel, onSelect, onSkip }) {
  return (
    <section className="flex min-h-dvh flex-col">
      <TopLine close />
      <main className="flex flex-1 flex-col items-center pt-10">
        <Hani pose="holding" face="thinking" size={90} animate="float" />
        <Bubble className="mt-4 text-center">{getWritingHint(writingLevel)}</Bubble>

        <div className="mt-9 grid w-full grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className="flex min-h-[112px] flex-col items-start justify-between rounded-[16px] border-[1.5px] border-[#E8E2D9] bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.035)] active:scale-[0.98]"
            >
              <span className="text-2xl" aria-hidden="true">{category.icon}</span>
              <span>
                <strong className="block font-body text-[16px] font-bold text-ink">{category.title}</strong>
                <span className="mt-1 block font-body text-xs text-ink/55">{category.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
      </main>
      <footer className="border-t border-[#E8E2D9]/80 py-4">
        <button type="button" onClick={onSkip} className="h-14 w-full rounded-[16px] border border-[#E8E2D9] bg-transparent font-body text-sm font-bold text-ink/65">
          주제가 없어도 괜찮아요
        </button>
      </footer>
    </section>
  )
}

function DetailStep({ categoryId, onBack, onPick, onSkip }) {
  const detail = detailMap[categoryId] ?? detailMap.daily
  return (
    <section className="min-h-dvh">
      <TopLine title={detail.title} onBack={onBack} />
      <main className="pt-7">
        <div className="flex items-center gap-3">
          <Hani pose="holding" face="default" size={68} animate="none" />
          <p className="font-hani-bubble text-[19px] text-ink">어떤 글을 쓸지 골라봐요.</p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          {detail.items.map((item) => (
            <button key={item.title} type="button" onClick={() => onPick(item.title)} className="rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.035)]">
              <strong className="font-body text-base font-bold text-ink">{item.icon} {item.title}</strong>
              <p className="mt-2 font-body text-sm text-ink/55">{item.desc}</p>
            </button>
          ))}
        </div>
        <button type="button" onClick={onSkip} className="mt-6 h-14 w-full rounded-[16px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">
          주제 없이 바로 쓸게요
        </button>
      </main>
    </section>
  )
}

function TopicLoadingStep({ onBack }) {
  return (
    <section className="min-h-dvh">
      <TopLine onBack={onBack} />
      <main className="pt-16 text-center">
        <Hani pose="thinking" face="thinking" size={112} animate="shake" />
        <Bubble className="mx-auto mt-4 inline-block">{`어떤 주제가 좋을지\n생각해볼게요...`}</Bubble>
        <p className="mt-5 font-body text-xl tracking-[0.35em] text-ink/45">• • •</p>
        <SkeletonList />
      </main>
    </section>
  )
}

function TopicDoneStep({ onBack, onTopic, onRefresh, onDirect }) {
  return (
    <section className="flex min-h-dvh flex-col">
      <TopLine onBack={onBack} />
      <main className="flex-1 pt-7">
        <div className="flex items-center gap-3">
          <Hani pose="cheering" face="happy" size={90} animate="none" />
          <p className="font-hani-bubble text-[20px] text-ink">이런 주제는 어때요?</p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          {topics.map((topic, index) => (
            <button key={topic} type="button" onClick={() => onTopic(topic)} className="rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left font-body text-base font-bold leading-[1.65] text-ink shadow-[0_8px_24px_rgba(0,0,0,0.035)]">
              {index + 1 === 1 ? '①' : index + 1 === 2 ? '②' : '③'} {topic}
            </button>
          ))}
        </div>
      </main>
      <footer className="border-t border-[#E8E2D9]/80 py-4 text-center">
        <button type="button" onClick={onRefresh} className="h-12 w-full rounded-[16px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/65">🔄 다른 주제 보기</button>
        <button type="button" onClick={onDirect} className="mt-3 font-body text-sm text-ink/55">직접 쓸게요</button>
      </footer>
    </section>
  )
}

function NoTopicStep({ onBack, onSuggest, onWrite }) {
  return (
    <section className="min-h-dvh">
      <TopLine onBack={onBack} />
      <main className="pt-12 text-center">
        <Hani pose="holding" face="default" size={90} animate="float" />
        <p className="mt-4 whitespace-pre-line font-hani-bubble text-[20px] leading-[1.65] text-ink">{`무엇이든 괜찮아요.\n떠오르는 대로 써봐요.`}</p>
        <button type="button" onClick={onSuggest} className="mt-8 h-16 w-full rounded-[16px] border border-[#E8E2D9] bg-white text-left px-5 font-body text-base font-bold text-ink shadow-[0_8px_24px_rgba(0,0,0,0.035)]">주제 제안 받기 →</button>
        <button type="button" onClick={() => onWrite('')} className="mt-5 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white">바로 쓰기 →</button>
      </main>
    </section>
  )
}

function ReflectSheet({ mode, onClose, onConfirm, onPremium }) {
  if (mode === 'loading') {
    return (
      <Sheet title="되짚음" onClose={onClose}>
        <div className="text-center">
          <Hani pose="thinking" face="thinking" size={90} animate="shake" />
          <p className="mt-3 font-hani-bubble text-[20px] text-ink">글을 읽고 있어요...</p>
        </div>
        <SkeletonList />
      </Sheet>
    )
  }

  if (mode === 'empty') {
    return (
      <Sheet title="되짚음" onClose={onClose}>
        <div className="text-center">
          <Hani pose="default" face="comfort" size={90} animate="none" />
          <p className="mt-4 whitespace-pre-line font-hani-bubble text-[20px] leading-[1.6] text-ink">{`오늘의 되짚음을 모두\n사용했어요. 내일 또 봐요.`}</p>
          <p className="mt-5 font-body text-sm leading-[1.7] text-ink/55">내일 자정 이후 다시<br />사용할 수 있어요.</p>
          <button type="button" onClick={onClose} className="mt-7 h-[52px] w-full rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">확인</button>
        </div>
      </Sheet>
    )
  }

  if (mode === 'premium') {
    return (
      <Sheet title="" onClose={onClose}>
        <div className="text-center">
          <Hani pose="default" face="default" size={90} animate="none" />
          <p className="mt-4 whitespace-pre-line font-hani-bubble text-[20px] leading-[1.6] text-ink">{`더 자주 되짚음을 받고\n싶으신가요?`}</p>
        </div>
        <ul className="mt-7 space-y-3 font-body text-sm font-bold text-ink">
          <li>✓ 되짚음 무제한</li><li>✓ 어휘 연습 무제한</li><li>✓ 필사 무제한</li>
        </ul>
        <button type="button" onClick={onPremium} className="mt-7 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white">월 4,900원으로 무제한</button>
        <button type="button" onClick={onClose} className="mt-4 w-full font-body text-sm text-ink/50">오늘은 그냥 닫을게요</button>
      </Sheet>
    )
  }

  return (
    <Sheet title="되짚음" onClose={onClose}>
      <div className="space-y-5">
        {[
          ['🖊 표현', '기뻤다 대신 가슴이 두근거렸다처럼 감각으로 표현해보면 어떨까요?'],
          ['〰 흐름', '도입부가 자연스러워요. 마무리 문장을 조금 더 다듬어보면 좋을 것 같아요'],
          ['💬 질문', '그 순간 가장 기억에 남는 감각은 무엇이었나요?'],
        ].map(([label, text]) => (
          <section key={label}>
            <h3 className="font-title text-base font-bold text-ink">{label}</h3>
            <div className="mt-2 rounded-[16px] border border-[#E8E2D9] bg-white p-4 font-body text-sm leading-[1.75] text-ink/75">“{text}”</div>
          </section>
        ))}
        <div className="flex items-center gap-3 pt-1">
          <Hani pose="cheering" face="happy" size={58} animate="none" />
          <div>
            <p className="font-hani-bubble text-[18px] text-ink">오늘 글, 잘 읽혔어요</p>
            <p className="font-body text-xs text-ink/45">오늘 되짚음 2/3 사용</p>
          </div>
        </div>
      </div>
      <button type="button" onClick={onConfirm} className="mt-5 h-12 w-full rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">확인</button>
    </Sheet>
  )
}

function SaveCompleteModal({ count, onClose }) {
  const bonuses = [
    ['글쓰기 완료', 10, count >= 100],
    ['150자 달성', 3, count >= 150],
    ['200자 달성', 7, count >= 200],
  ].filter((item) => item[2])
  const total = bonuses.reduce((sum, item) => sum + item[1], 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/35 px-6">
      <section className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)] animate-fade-in">
        <Hani pose="cheering" face="happy" size={134} animate="none" />
        <h2 className="mt-5 font-title text-2xl font-bold text-ink">저장됐어요!</h2>
        <div className="mt-5 rounded-[16px] border border-[#E8E2D9] bg-[#F5F0E8] p-4 text-left">
          {bonuses.map(([label, point]) => (
            <p key={label} className="flex justify-between font-body text-sm text-ink/75"><span>{label}</span><strong>+{point}pt</strong></p>
          ))}
          <div className="my-3 border-t border-[#E8E2D9]" />
          <p className="flex justify-between font-body text-base font-bold text-[#D4A853]"><span>합계</span><strong>+{total}pt</strong></p>
        </div>
        <button type="button" onClick={onClose} className="mt-6 h-[52px] w-full rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">확인</button>
      </section>
    </div>
  )
}

function DraftSheet({ onClose, onLoad, onNew }) {
  return (
    <Sheet title="이어 쓸 글이 있어요" onClose={onClose}>
      <div className="mb-5 flex items-center gap-3">
        <Hani pose="default" face="default" size={62} animate="none" />
        <p className="font-hani-bubble text-[19px] text-ink">계속 써볼까요?</p>
      </div>
      <div className="space-y-3">
        {drafts.map((draft) => (
          <button key={draft.title + draft.count} type="button" onClick={() => onLoad(draft)} className="w-full rounded-[16px] border border-[#E8E2D9] bg-white p-4 text-left">
            <strong className="font-body text-sm text-ink">{draft.title}</strong>
            <p className="mt-1 font-body text-xs text-ink/50">{draft.date} · {draft.count}자 <span className="float-right">이어쓰기&gt;</span></p>
          </button>
        ))}
      </div>
      <button type="button" onClick={onNew} className="mt-5 h-[52px] w-full rounded-[16px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">새 글 쓰기</button>
    </Sheet>
  )
}

function PaperSheet({ selected, onSelect, onClose }) {
  return (
    <Sheet title="배경지 선택" onClose={onClose}>
      <h3 className="font-body text-sm font-bold text-ink">기본 (무료)</h3>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {papers.slice(0, 3).map((paper) => (
          <button key={paper.name} type="button" onClick={() => onSelect(paper.name)} className="h-20 rounded-[12px] border border-[#E8E2D9] bg-white font-body text-sm text-ink">
            {paper.name}<br />{selected === paper.name && <span className="text-[#003478]">●</span>}
          </button>
        ))}
      </div>
      <h3 className="mt-6 font-body text-sm font-bold text-ink">포인트 구매</h3>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {papers.slice(3).map((paper) => (
          <button key={paper.name} type="button" className="h-20 rounded-[12px] border border-[#E8E2D9] bg-white font-body text-sm text-ink/65">
            {paper.locked ? '🔒' : ''}{paper.name}<br />{paper.price}pt
          </button>
        ))}
      </div>
      <button type="button" onClick={onClose} className="mt-6 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white">적용하기</button>
    </Sheet>
  )
}

function FontSheet({ selected, onSelect, onClose }) {
  return (
    <Sheet title="폰트 선택" onClose={onClose}>
      <div className="space-y-4">
        {fonts.map((font, index) => (
          <button key={font.name} type="button" onClick={() => font.free && onSelect(font.name)} className={cn('flex w-full items-center justify-between font-body text-sm text-ink', !font.free && 'text-ink/45', index === 3 && 'border-t border-[#E8E2D9] pt-4')}>
            <span>{selected === font.name ? '✓ ' : font.free ? '  ' : '🔒 '}{font.name}</span>
            <span>{font.sample}{!font.free && ` ${font.price}pt`}</span>
          </button>
        ))}
      </div>
    </Sheet>
  )
}

function EditorStep({ initialTitle, onBack }) {
  const router = useRouter()
  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState('')
  const [floatingSave, setFloatingSave] = useState('')
  const [toast, setToast] = useState('')
  const [paperSheet, setPaperSheet] = useState(false)
  const [fontSheet, setFontSheet] = useState(false)
  const [reflectMode, setReflectMode] = useState(null)
  const [saveModal, setSaveModal] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)
  const [paper, setPaper] = useState('흰색')
  const [font, setFont] = useState('Noto Serif KR')
  const awardedRef = useRef(new Set())
  const saveTimerRef = useRef(null)
  const count = countChars(body)
  const progress = Math.min(100, Math.round((count / DAILY_GOAL) * 100))
  const canSave = body.trim().length > 0 || title.trim().length > 0
  const achieved = count >= DAILY_GOAL
  const reflectAvailable = count >= REFLECT_MIN_CHARS

  useEffect(() => () => window.clearTimeout(saveTimerRef.current), [])

  const showPointToast = (message, seconds = 3000) => {
    setToast(message)
    window.setTimeout(() => setToast(''), seconds)
  }

  const handleBodyChange = (event) => {
    const next = event.target.value
    setBody(next)
    const nextCount = countChars(next)

    ;[[100, '+10pt 획득!'], [150, '+3pt 추가!'], [200, '+7pt 추가!'], [300, '+15pt 추가!']].forEach(([threshold, message]) => {
      if (nextCount >= threshold && !awardedRef.current.has(threshold)) {
        awardedRef.current.add(threshold)
        showPointToast(message)
      }
    })

    window.clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => {
      setFloatingSave(`임시저장됨 ${nowLabel()}`)
      window.setTimeout(() => setFloatingSave(''), 2000)
    }, 500)
  }

  const openReflect = () => {
    if (!reflectAvailable) return
    setReflectMode('loading')
    window.setTimeout(() => setReflectMode('done'), 900)
  }

  const savePost = async () => {
    if (!canSave || saving) return

    setSaving(true)
    setSaveError('')

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          body,
          isDraft: false,
          type: 'free',
        }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          window.localStorage.setItem('han-geul-draft', JSON.stringify({
            title,
            content: body,
            savedAt: new Date().toISOString(),
          }))
          setFloatingSave(`임시저장됨 ${nowLabel()}`)
          setSaveModal(true)
          return
        }
        throw new Error('save_failed')
      }

      await response.json()
      setSaveModal(true)
    } catch {
      setSaveError('저장 중 오류가 발생했어요.')
    } finally {
      setSaving(false)
    }
  }

  const reflectText = count < REFLECT_MIN_CHARS ? '300자 이상 작성 후' : '되짚음 3/3'
  const reflectClass = count < REFLECT_MIN_CHARS
    ? 'bg-[#F5F0E8] text-[#9E9590]'
    : achieved
      ? 'bg-[#003478] text-white'
      : 'bg-[#EEF2FA] text-[#003478]'

  return (
    <section className="min-h-dvh pb-20">
      <header className="fixed left-1/2 top-0 z-30 flex h-14 w-full max-w-lg -translate-x-1/2 items-center justify-between border-b border-[#E8E2D9] hanji-bg px-4">
        <button type="button" onClick={onBack} className="w-12 text-left font-body text-xl text-ink">←</button>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="제목 (선택)" className="min-w-0 flex-1 bg-transparent text-center font-title text-base font-bold text-ink outline-none placeholder:text-ink/45" />
        <button type="button" disabled={!canSave || saving} onClick={savePost} className="w-12 text-right font-body text-sm font-bold disabled:text-[#9E9590] enabled:text-[#003478]">{saving ? '저장중' : '저장'}</button>
      </header>

      <main className="pt-[72px]">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="제목을 입력해주세요 (선택)" className="w-full border-b border-[#E8E2D9] bg-transparent py-4 font-title text-[18px] font-bold text-ink outline-none placeholder:text-ink/35" />
        <textarea value={body} onChange={handleBodyChange} placeholder="오늘의 이야기를 써주세요." className="mt-5 min-h-[58dvh] w-full resize-none bg-transparent font-title text-base leading-[1.8] text-ink outline-none placeholder:text-ink/35" />
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => setPaperSheet(true)} className="rounded-[12px] border border-[#E8E2D9] px-3 py-2 font-body text-xs text-ink/55">배경지</button>
          <button type="button" onClick={() => setFontSheet(true)} className="rounded-[12px] border border-[#E8E2D9] px-3 py-2 font-body text-xs text-ink/55">폰트</button>
        </div>
      </main>

      {toast && <div className="fixed right-4 top-16 z-40 rounded-full bg-[#D4A853] px-4 py-2 font-body text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-fade-in">{toast}</div>}
      {saveError && <div className="fixed left-1/2 top-16 z-40 -translate-x-1/2 rounded-full bg-[#CD2E3A] px-4 py-2 font-body text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-fade-in">{saveError}</div>}
      {floatingSave && <div className="fixed bottom-[76px] left-1/2 z-40 -translate-x-1/2 rounded-full bg-[rgba(26,26,46,0.85)] px-4 py-2 font-body text-xs font-bold text-white animate-fade-in">{floatingSave}</div>}

      <footer className="fixed bottom-0 left-1/2 z-30 flex h-16 w-full max-w-lg -translate-x-1/2 items-center gap-3 border-t border-[#E8E2D9] hanji-bg px-4">
        <div className="w-[74px] font-body text-xs font-bold" style={{ color: achieved ? '#D4A853' : '#1A1714' }}>{count}/100자</div>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E8E2D9]"><div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: achieved ? '#D4A853' : '#003478' }} /></div>
        <button type="button" onClick={openReflect} className={cn('min-w-[92px] rounded-[14px] px-3 py-2 font-body text-xs font-bold', reflectClass)}>{reflectText}</button>
      </footer>

      {paperSheet && <PaperSheet selected={paper} onSelect={setPaper} onClose={() => setPaperSheet(false)} />}
      {fontSheet && <FontSheet selected={font} onSelect={setFont} onClose={() => setFontSheet(false)} />}
      {reflectMode && <ReflectSheet mode={reflectMode} onClose={() => setReflectMode(null)} onConfirm={() => setReflectMode(null)} onPremium={() => router.push('/subscribe')} />}
      {saveModal && <SaveCompleteModal count={count} onClose={() => router.push('/')} />}
    </section>
  )
}

export default function WritePage() {
  const [step, setStep] = useState('category')
  const [categoryId, setCategoryId] = useState('daily')
  const [initialTitle, setInitialTitle] = useState('')
  const [writingLevel, setWritingLevel] = useState('1')
  const [showDrafts, setShowDrafts] = useState(false)

  useEffect(() => {
    window.queueMicrotask(() => {
      setWritingLevel(window.localStorage.getItem('han-geul:onboarding:writingLevel') ?? '1')
      setShowDrafts(window.localStorage.getItem('han-geul:write:draft-sheet-seen') !== 'yes')
    })
  }, [])

  const startTopicLoading = () => {
    setStep('topicLoading')
    window.setTimeout(() => setStep('topicDone'), 900)
  }

  const startEditor = (title = '') => {
    setInitialTitle(title)
    setStep('editor')
  }

  return (
    <PageLayout hasTopBar={false} hasBottomTab={false} className="px-4 pb-0">
      {step === 'category' && <CategoryStep writingLevel={writingLevel} onSelect={(id) => { setCategoryId(id); setStep('detail') }} onSkip={() => setStep('noTopic')} />}
      {step === 'detail' && <DetailStep categoryId={categoryId} onBack={() => setStep('category')} onPick={startTopicLoading} onSkip={() => setStep('noTopic')} />}
      {step === 'topicLoading' && <TopicLoadingStep onBack={() => setStep('detail')} />}
      {step === 'topicDone' && <TopicDoneStep onBack={() => setStep('detail')} onTopic={startEditor} onRefresh={startTopicLoading} onDirect={() => startEditor('')} />}
      {step === 'noTopic' && <NoTopicStep onBack={() => setStep('category')} onSuggest={startTopicLoading} onWrite={startEditor} />}
      {step === 'editor' && <EditorStep initialTitle={initialTitle} onBack={() => setStep('category')} />}
      {showDrafts && step === 'category' && (
        <DraftSheet
          onClose={() => { window.localStorage.setItem('han-geul:write:draft-sheet-seen', 'yes'); setShowDrafts(false) }}
          onLoad={(draft) => { window.localStorage.setItem('han-geul:write:draft-sheet-seen', 'yes'); setShowDrafts(false); startEditor(draft.title) }}
          onNew={() => { window.localStorage.setItem('han-geul:write:draft-sheet-seen', 'yes'); setShowDrafts(false) }}
        />
      )}
    </PageLayout>
  )
}
