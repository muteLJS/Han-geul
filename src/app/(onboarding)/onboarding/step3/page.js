// src/app/(onboarding)/onboarding/step3/page.js
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const quizQuestions = [
  {
    question: "'호젓하다'의 뜻으로\n알맞은 것은?",
    options: [
      '시끄럽고 복잡하다',
      '한적하고 쓸쓸하다',
      '따뜻하고 포근하다',
      '밝고 화사하다',
    ],
    answerIndex: 1,
  },
  {
    question: "'갈무리'의 뜻으로\n알맞은 것은?",
    options: [
      '길을 잃고 헤매다',
      '일을 끝내고 정리하다',
      '빠르게 달려가다',
      '큰 소리로 외치다',
    ],
    answerIndex: 1,
  },
  {
    question: "'나지막하다'의 뜻으로\n알맞은 것은?",
    options: [
      '매우 높고 가파르다',
      '소리가 조금 낮다',
      '넓고 평평하다',
      '깊고 어둡다',
    ],
    answerIndex: 1,
  },
]

export default function OnboardingStep3Page() {
  const router = useRouter()
  const nextTimerRef = useRef(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)

  const currentQuestion = quizQuestions[questionIndex]
  const hasAnswered = selectedAnswer !== null

  useEffect(() => {
    return () => {
      if (nextTimerRef.current) {
        window.clearTimeout(nextTimerRef.current)
      }
    }
  }, [])

  const handleSelect = (optionIndex) => {
    if (hasAnswered || nextTimerRef.current) return

    const answeredCorrectly = optionIndex === currentQuestion.answerIndex
    const nextCorrectCount = correctCount + (answeredCorrectly ? 1 : 0)

    setSelectedAnswer(optionIndex)
    if (answeredCorrectly) {
      setCorrectCount(nextCorrectCount)
    }

    nextTimerRef.current = window.setTimeout(() => {
      nextTimerRef.current = null
      const isLastQuestion = questionIndex === quizQuestions.length - 1

      if (isLastQuestion) {
        const vocabLevel = nextCorrectCount <= 1 ? 1 : nextCorrectCount === 2 ? 2 : 3
        window.localStorage.setItem('han-geul:onboarding:vocabLevel', String(vocabLevel))
        window.localStorage.setItem('han-geul:onboarding:correctCount', String(nextCorrectCount))
        router.push('/onboarding/complete')
        return
      }

      setQuestionIndex((index) => index + 1)
      setSelectedAnswer(null)
    }, 1500)
  }

  return (
    <section className="flex min-h-dvh flex-col bg-transparent px-6 pb-6 animate-fade-in">
      <header className="pt-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="뒤로가기"
            className="flex h-9 w-7 items-center justify-start font-body text-2xl text-ink"
          >
            ←
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E8E2D9]">
            <div className="h-full rounded-full bg-[#003478]" style={{ width: '100%' }} />
          </div>
          <span className="font-body text-sm font-medium text-ink/65">3 / 3</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center">
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Hani pose="holding" face="happy" size={112} animate="nod" />

          <div className="rounded-[20px] border border-[#E8E2D9] bg-white px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="whitespace-pre-line font-hani-bubble text-[20px] leading-[1.55] text-ink">
              {`간단한 문제 3개예요.\n딱 맞는 콘텐츠를\n준비할게요.`}
            </p>
          </div>
        </div>

        <div className="mt-6 w-full">
          <p className="mb-2 text-right font-body text-sm font-medium text-ink/65">
            {questionIndex + 1} / {quizQuestions.length}
          </p>

          <section className="rounded-[20px] border border-[#E8E2D9] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <h1 className="whitespace-pre-line py-3 text-center font-title text-[20px] font-bold leading-[1.65] text-ink">
              {currentQuestion.question}
            </h1>

            <div className="mt-4 flex flex-col gap-3">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex
                const isAnswer = currentQuestion.answerIndex === optionIndex
                const shouldShowCorrect = hasAnswered && isAnswer
                const shouldShowWrong = hasAnswered && isSelected && !isAnswer

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(optionIndex)}
                    disabled={hasAnswered}
                    className={cn(
                      'flex min-h-[48px] items-center justify-between rounded-[12px] border-[1.5px] border-[#E8E2D9] bg-white px-4 text-left font-body text-[14px] font-bold leading-[1.5] text-ink transition-colors duration-150',
                      shouldShowCorrect && 'border-[#4CAF50] bg-[#E8F5E9] text-ink',
                      shouldShowWrong && 'border-[#CD2E3A] bg-[#FFEBEE] text-ink',
                    )}
                  >
                    <span>{optionIndex + 1 === 1 ? '①' : optionIndex + 1 === 2 ? '②' : optionIndex + 1 === 3 ? '③' : '④'} {option}</span>
                    {shouldShowCorrect && <span className="ml-3 text-[#4CAF50]" aria-hidden="true">✓</span>}
                    {shouldShowWrong && <span className="ml-3 text-[#CD2E3A]" aria-hidden="true">✕</span>}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </section>
  )
}
