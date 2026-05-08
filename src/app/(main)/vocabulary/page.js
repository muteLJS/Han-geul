// src/app/(main)/vocabulary/page.js
'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const questions = [
  {
    word: '호젓하다',
    question: "'호젓하다'의 뜻으로\n알맞은 것은?",
    answer: '한적하고 쓸쓸하다',
    options: ['시끄럽고 복잡하다', '한적하고 쓸쓸하다', '따뜻하고 포근하다', '밝고 화사하다'],
    answerIndex: 1,
    hint: '첫 글자: 한',
  },
  {
    word: '갈무리',
    question: "'갈무리'의 뜻으로\n알맞은 것은?",
    answer: '일을 끝내고 정리하다',
    options: ['일을 끝내고 정리하다', '갑자기 멈추다', '밝게 빛나다', '천천히 걷다'],
    answerIndex: 0,
    hint: '정리와 관련된 말이에요.',
  },
  {
    word: '나지막하다',
    question: "'나지막하다'의 뜻으로\n알맞은 것은?",
    answer: '소리가 조금 낮다',
    options: ['매우 높다', '소리가 조금 낮다', '넓고 평평하다', '깊고 어둡다'],
    answerIndex: 1,
    hint: '높낮이를 떠올려보세요.',
  },
  {
    word: '새록새록',
    question: "'새록새록'과 가까운\n느낌의 말은?",
    answer: '잇따라 새롭게',
    options: ['몹시 빠르게', '잇따라 새롭게', '아주 차갑게', '조용히 멀리'],
    answerIndex: 1,
    hint: '새롭게 떠오르는 느낌이에요.',
  },
  {
    word: '고즈넉하다',
    question: "'고즈넉하다'의 뜻으로\n알맞은 것은?",
    answer: '조용하고 아늑하다',
    options: ['몹시 화려하다', '조용하고 아늑하다', '날카롭고 차갑다', '복잡하고 시끄럽다'],
    answerIndex: 1,
    hint: '조용한 분위기의 말이에요.',
  },
]

const levels = [
  { level: 1, name: '일상 어휘', rate: '정답률92%', locked: false },
  { level: 2, name: '교양 어휘', rate: '정답률74%', current: true, locked: false },
  { level: 3, name: '문학·인문 어휘', desc: '2단계 80% 달성 시 해금', locked: true },
  { level: 4, name: '고급 어휘', locked: true },
  { level: 5, name: '한자어·고어', locked: true },
]

function TopBar({ title, right, onBack }) {
  return (
    <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
      <div className="flex h-7 items-center justify-between">
        {onBack ? (
          <button type="button" onClick={onBack} className="w-16 text-left font-body text-sm text-ink">← 뒤로</button>
        ) : (
          <span className="w-16" />
        )}
        <h1 className="flex-1 text-center font-title text-base font-bold text-ink">{title}</h1>
        <span className="w-16 text-right font-body text-sm text-ink/65">{right}</span>
      </div>
    </header>
  )
}

function PracticeHome({ onVocabulary }) {
  return (
    <section className="min-h-dvh pb-20">
      <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
        <h1 className="font-title text-xl font-bold text-ink">연습</h1>
      </header>
      <main className="pt-10">
        <div className="flex flex-col items-center text-center">
          <Hani pose="default" face="default" size={90} animate="float" />
          <p className="mt-4 font-hani-bubble text-[20px] text-ink">오늘 연습할 준비 됐나요?</p>
        </div>

        <div className="mt-9 flex flex-col gap-3">
          <button type="button" onClick={onVocabulary} className="rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="font-body text-base font-bold text-ink">📖 어휘 연습</p>
            <p className="mt-2 font-body text-sm text-ink/55">2단계 진행 중</p>
            <p className="mt-3 text-right font-body text-sm font-bold text-[#4CAF50]">오늘 완료 ✓</p>
          </button>
          <Link href="/copying" className="rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="font-body text-base font-bold text-ink">✍️ 오늘의 필사</p>
            <p className="mt-2 font-body text-sm text-ink/55">“봄날의 소묘” - 박완서</p>
            <p className="mt-3 text-right font-body text-sm font-bold text-ink/55">미완료 →</p>
          </Link>
          <Link href="/self-writing" className="rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="font-body text-base font-bold text-ink">✂️ 글 다듬기</p>
            <p className="mt-2 font-body text-sm text-ink/55">낱말 바꾸기</p>
            <p className="mt-3 text-right font-body text-sm font-bold text-ink/55">미완료 →</p>
          </Link>
        </div>
      </main>
    </section>
  )
}

function LevelSelect({ onBack, onStart }) {
  return (
    <section className="min-h-dvh">
      <TopBar title="어휘 연습" onBack={onBack} />
      <main className="pt-7">
        <div className="flex items-center gap-3">
          <Hani pose="default" face="default" size={68} animate="none" />
          <p className="font-hani-bubble text-[19px] text-ink">몇 단계로 연습할까요?</p>
        </div>
        <div className="mt-7 flex flex-col gap-3">
          {levels.map((level) => (
            <button
              key={level.level}
              type="button"
              disabled={level.locked}
              onClick={() => !level.locked && onStart()}
              className={cn(
                'rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.035)]',
                level.current && 'border-[#003478] bg-[#EEF2FA]',
                level.locked && 'text-ink/45',
              )}
            >
              <p className="font-body text-sm font-bold text-ink/80">
                {level.locked && '🔒 '}{level.level}단계&nbsp;&nbsp; {level.name} {level.rate && <span className="float-right">{level.rate}</span>}
              </p>
              {level.desc && <p className="mt-2 font-body text-xs text-ink/45">{level.desc}</p>}
            </button>
          ))}
        </div>
      </main>
    </section>
  )
}

function HintBox({ hintCount, hint }) {
  if (hintCount === 0) return null
  return (
    <div className="mb-5 rounded-[14px] border border-[#D4A853] bg-[#FFF8E7] p-4 text-left">
      <p className="font-body text-sm font-bold text-[#8A5B16]">💡 힌트 {hintCount}/3</p>
      <p className="mt-2 font-body text-sm text-ink/70">{hint}</p>
    </div>
  )
}

function FeedbackCard({ answered, correct }) {
  if (!answered) return null
  return (
    <div className="mt-5 rounded-[16px] border border-[#E8E2D9] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.035)]">
      <div className="flex gap-3">
        <Hani pose={correct ? 'cheering' : 'default'} face={correct ? 'happy' : 'comfort'} size={58} animate="none" />
        <div className="flex-1">
          <p className="whitespace-pre-line font-hani-bubble text-[18px] leading-[1.55] text-ink">
            {correct ? `맞아요!\n이 단어, 오늘 꼭 써보세요` : `이런 단어도\n있었군요.\n다음엔 기억날 거예요.`}
          </p>
          {correct && <p className="mt-1 text-right font-body text-sm font-bold text-[#D4A853]">+2pt ✨</p>}
        </div>
      </div>
    </div>
  )
}

function Quiz({ onBack, onDone, exhausted }) {
  const [index, setIndex] = useState(1)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongWords, setWrongWords] = useState([])
  const [hintCount, setHintCount] = useState(0)
  const timerRef = useRef(null)
  const current = questions[index - 1]
  const answered = selected !== null
  const selectedCorrect = selected === current.answerIndex

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  if (exhausted) return <Exhausted onBack={onBack} />

  const selectAnswer = (optionIndex) => {
    if (answered) return
    const isCorrect = optionIndex === current.answerIndex
    setSelected(optionIndex)
    if (isCorrect) setCorrectCount((count) => count + 1)
    if (!isCorrect) setWrongWords((words) => [...words, current])
    timerRef.current = window.setTimeout(() => {
      if (index === questions.length) {
        onDone({ correctCount: correctCount + (isCorrect ? 1 : 0), wrongWords: isCorrect ? wrongWords : [...wrongWords, current] })
        return
      }
      setIndex((value) => value + 1)
      setSelected(null)
      setHintCount(0)
    }, 1500)
  }

  return (
    <section className="min-h-dvh">
      <TopBar title="어휘 연습" right="2단계" onBack={onBack} />
      <div className="-mx-4 border-b border-[#E8E2D9] px-4 py-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#E8E2D9]">
          <div className="h-full rounded-full bg-[#003478]" style={{ width: `${(index / questions.length) * 100}%` }} />
        </div>
        <p className="mt-2 font-body text-xs text-ink/45">진행바 {index}/{questions.length}</p>
      </div>
      <main className="pt-8">
        <section className="rounded-[20px] border border-[#E8E2D9] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <HintBox hintCount={hintCount} hint={current.hint} />
          <h2 className="whitespace-pre-line py-3 text-center font-title text-xl font-bold leading-[1.65] text-ink">{current.question}</h2>
          <div className="mt-5 flex flex-col gap-3">
            {current.options.map((option, optionIndex) => {
              const showCorrect = answered && optionIndex === current.answerIndex
              const showWrong = answered && selected === optionIndex && optionIndex !== current.answerIndex
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectAnswer(optionIndex)}
                  disabled={answered}
                  className={cn(
                    'flex min-h-[48px] items-center justify-between rounded-[12px] border-[1.5px] border-[#E8E2D9] bg-white px-4 text-left font-body text-sm font-bold leading-[1.5] text-ink',
                    showCorrect && 'border-[#4CAF50] bg-[#E8F5E9]',
                    showWrong && 'border-[#CD2E3A] bg-[#FFEBEE]',
                  )}
                >
                  <span>{['①', '②', '③', '④'][optionIndex]} {option}</span>
                  {showCorrect && <span className="text-[#4CAF50]">✓</span>}
                  {showWrong && <span className="text-[#CD2E3A]">✕</span>}
                </button>
              )
            })}
          </div>
        </section>
        <FeedbackCard answered={answered} correct={selectedCorrect} />
        {!answered && hintCount < 3 && (
          <button type="button" onClick={() => setHintCount((count) => count + 1)} className="mt-5 h-12 rounded-[16px] border border-[#E8E2D9] px-5 font-body text-sm font-bold text-ink/65">
            💡 힌트 ({hintCount + 1}/3)
          </button>
        )}
      </main>
    </section>
  )
}

function Result({ result, onRetry, onHome }) {
  const correct = result?.correctCount ?? 4
  const wrongWords = result?.wrongWords ?? [questions[0]]
  const point = correct * 2
  const rate = Math.round((correct / questions.length) * 100)
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center py-8 text-center">
      <Hani pose="cheering" face="happy" size={180} animate="none" />
      <p className="mt-5 font-title text-[52px] font-bold leading-none text-[#003478]">{correct} / 5</p>
      <p className="mt-3 font-title text-xl font-bold text-ink">정답이에요!</p>
      <div className="mt-7 w-full rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        <p className="flex justify-between font-body text-sm text-ink/70"><span>정답률</span><strong>{rate}%</strong></p>
        <p className="mt-2 flex justify-between font-body text-sm text-ink/70"><span>획득 포인트</span><strong className="text-[#D4A853]">+{point}pt</strong></p>
        <p className="mt-2 flex justify-between font-body text-sm text-ink/70"><span>2단계 달성률</span><strong>74% → 76%</strong></p>
      </div>
      {wrongWords.length > 0 && (
        <div className="mt-4 w-full rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <h2 className="font-title text-base font-bold text-ink">오늘 틀린 단어</h2>
          <p className="mt-3 font-body text-sm font-bold text-ink">{wrongWords[0].word}</p>
          <p className="mt-1 font-body text-sm text-ink/60">→ {wrongWords[0].answer}</p>
        </div>
      )}
      {rate >= 80 && <div className="mt-4 w-full rounded-[16px] border border-[#D4A853] bg-[#FFF8E7] p-4 font-body text-sm font-bold text-[#8A5B16]">🎉 3단계가 열렸어요!</div>}
      <div className="mt-7 grid w-full grid-cols-2 gap-3">
        <button type="button" onClick={onRetry} className="h-14 rounded-[16px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/65">다시 풀기</button>
        <button type="button" onClick={onHome} className="h-14 rounded-[16px] bg-[#003478] font-body text-sm font-bold text-white">홈으로</button>
      </div>
    </section>
  )
}

function Exhausted({ onBack }) {
  return (
    <section className="min-h-dvh">
      <TopBar title="어휘 연습" onBack={onBack} />
      <main className="pt-12 text-center">
        <Hani pose="default" face="comfort" size={90} animate="none" />
        <p className="mt-4 whitespace-pre-line font-hani-bubble text-[20px] leading-[1.6] text-ink">{`오늘 어휘 연습을 모두\n마쳤어요. 내일 또 봐요.`}</p>
        <div className="mt-8 rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="font-body text-sm text-ink/70">문제 5개 · 정답 4개</p>
          <p className="mt-2 font-body text-sm font-bold text-[#D4A853]">획득 포인트 +8pt</p>
        </div>
        <p className="mt-8 font-body text-sm text-ink/55">내일 자정 이후 다시 열려요</p>
        <button type="button" onClick={onBack} className="mt-7 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white">다른 연습 하러 가기</button>
      </main>
    </section>
  )
}

function VocabularyPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialView = searchParams.get('view') ?? 'home'
  const [view, setView] = useState(initialView)
  const [result, setResult] = useState(null)

  const go = (nextView) => {
    setView(nextView)
    const query = nextView === 'home' ? '' : `?view=${nextView}`
    router.replace(`/vocabulary${query}`, { scroll: false })
  }

  return (
    <PageLayout hasTopBar={false} className="px-4 pb-0">
      {view === 'home' && <PracticeHome onVocabulary={() => go('levels')} />}
      {view === 'levels' && <LevelSelect onBack={() => go('home')} onStart={() => go('quiz')} />}
      {view === 'quiz' && <Quiz onBack={() => go('levels')} onDone={(nextResult) => { setResult(nextResult); go('result') }} />}
      {view === 'result' && <Result result={result} onRetry={() => go('quiz')} onHome={() => go('home')} />}
      {view === 'exhausted' && <Quiz exhausted onBack={() => go('home')} />}
    </PageLayout>
  )
}


export default function VocabularyPage() {
  return (
    <Suspense fallback={null}>
      <VocabularyPageInner />
    </Suspense>
  )
}
