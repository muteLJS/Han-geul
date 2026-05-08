// src/app/(onboarding)/onboarding/step3/page.js
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const quizQuestions = [
  {
    question: "'호젓하다'의 뜻은?",
    options: [
      '시끄럽고 복잡하다',
      '한적하고 쓸쓸하다',
      '따뜻하고 포근하다',
      '밝고 화사하다',
    ],
    answerIndex: 1,
  },
  {
    question: "'갈무리'의 뜻은?",
    options: [
      '길을 잃다',
      '일을 끝내고 정리하다',
      '빠르게 달리다',
      '큰 소리로 외치다',
    ],
    answerIndex: 1,
  },
  {
    question: "'나지막하다'의 뜻은?",
    options: [
      '매우 높다',
      '조금 낮다',
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

  const currentQuestion = quizQuestions[questionIndex]
  const hasAnswered = selectedAnswer !== null
  const isCorrect = selectedAnswer === currentQuestion.answerIndex

  useEffect(() => {
    return () => {
      if (nextTimerRef.current) {
        window.clearTimeout(nextTimerRef.current)
      }
    }
  }, [])

  const handleSelect = (optionIndex) => {
    if (hasAnswered || nextTimerRef.current) return

    setSelectedAnswer(optionIndex)
    nextTimerRef.current = window.setTimeout(() => {
      nextTimerRef.current = null
      const isLastQuestion = questionIndex === quizQuestions.length - 1

      if (isLastQuestion) {
        router.push('/onboarding/complete')
        return
      }

      setQuestionIndex((index) => index + 1)
      setSelectedAnswer(null)
    }, 1500)
  }

  return (
  <section className="flex min-h-dvh flex-col items-center bg-[#FAF6EE] px-6 pb-6 animate-fade-in">
    <div className="w-full max-w-md">
      <div className="-mx-6 h-1 bg-black/10">
        <div className="h-full bg-[#003478]" style={{ width: '100%' }} />
      </div>

      <div className="flex flex-col items-center gap-5 mt-14 text-center">
        <Hani pose="holding" face="happy" size={120} animate="nod" />

        <div className="rounded-3xl bg-white px-6 py-4 shadow-sm">
          <p className="font-body text-lg font-bold leading-8 text-ink">
            간단한 문제 3개예요. 딱 맞는 콘텐츠를 준비할게요.
          </p>
        </div>
      </div>

      <div className="mt-8 w-full rounded-3xl bg-white p-5 shadow-sm">
        <p className="font-body text-sm font-bold text-[#003478]">
          {questionIndex + 1} / {quizQuestions.length}
        </p>
        <h1 className="mt-2 font-title text-2xl font-bold leading-snug text-ink">
          {currentQuestion.question}
        </h1>

        <div className="mt-6 flex flex-col gap-3">
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
                  'flex min-h-14 items-center justify-between rounded-2xl border-2 bg-[#FAF6EE] px-4 text-left font-body text-base font-bold leading-7 text-ink transition-colors',
                  !hasAnswered && 'border-transparent hover:border-black/10',
                  shouldShowCorrect && 'border-green-500 bg-green-50 text-green-700',
                  shouldShowWrong && 'border-red-500 bg-red-50 text-red-700',
                )}
              >
                <span>{optionIndex + 1}. {option}</span>
                {shouldShowCorrect && <span aria-hidden="true">✓</span>}
                {shouldShowWrong && <span aria-hidden="true">✕</span>}
              </button>
            )
          })}
        </div>
      </div>

      {hasAnswered && isCorrect && (
        <button
          type="button"
          disabled
          className="mt-4 h-14 w-full rounded-2xl bg-green-500 font-body text-base font-bold text-white"
        >
          맞아요!
        </button>
      )}

      {hasAnswered && !isCorrect && (
        <div className="mt-4 flex h-14 w-full items-center justify-center rounded-2xl bg-red-500 font-body text-base font-bold text-white">
          정답을 확인해볼게요
        </div>
      )}
    </div>
  </section>
)

}
