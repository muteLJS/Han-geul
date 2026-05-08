// src/app/(onboarding)/intro/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const slides = [
  {
    hani: <Hani pose="holding" face="default" size={180} animate="float" />,
    title: '글쓰기가 어렵게\n느껴졌나요?',
    description: '잘 쓰는 것보다 꾸준히\n쓰는 게 먼저예요.',
    button: '다음 →',
  },
  {
    hani: <Hani pose="cheering" face="happy" size={180} animate="bounce" />,
    title: '평가 없이, 제안만 해요.',
    description: '한이가 틀렸다고 말하는 대신\n더 나은 표현을 함께 찾아드려요.',
    button: '다음 →',
  },
  {
    hani: <Hani pose="holding" face="happy" size={180} animate="nod" />,
    title: '매일 쌓인 글이\n나만의 책이 돼요.',
    description: '100자부터 시작해서\n언젠가 한 권의 책이 완성돼요.',
    button: '시작하기',
  },
]

export default function IntroPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)

  const currentSlide = slides[currentIndex]
  const isLastSlide = currentIndex === slides.length - 1

  const goToLogin = () => {
    router.push('/login')
  }

  const goNext = () => {
    if (isLastSlide) {
      goToLogin()
      return
    }

    setCurrentIndex((index) => index + 1)
  }

  const goPrevious = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0))
  }

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
    const distance = touchStartX - touchEndX

    if (distance > 40) goNext()
    if (distance < -40) goPrevious()

    setTouchStartX(null)
  }

  return (
    <section
      className="flex min-h-dvh flex-col bg-[#FAF6EE] px-6 animate-fade-in"
      onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
      onTouchEnd={handleTouchEnd}
    >
      <header className="flex justify-end py-5">
        <button
          type="button"
          onClick={goToLogin}
          className="font-body text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          건너뛰기
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex h-[180px] items-center justify-center">
          {currentSlide.hani}
        </div>

        <div className="mt-12 space-y-5">
          <h1 className="whitespace-pre-line font-title text-[22px] font-bold leading-snug text-ink">
            {currentSlide.title}
          </h1>
          <p className="whitespace-pre-line font-body text-[15px] leading-7 text-[#6B6560]">
            {currentSlide.description}
          </p>
        </div>
      </div>

      <div className="pb-10">
        <div className="mb-6 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <span
              key={slide.title}
              aria-label={`${index + 1}번째 슬라이드`}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                index === currentIndex ? 'bg-[#003478]' : 'bg-black/20',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="h-14 w-full rounded-2xl bg-[#003478] font-body text-base font-bold text-white transition-opacity hover:opacity-90"
        >
          {currentSlide.button}
        </button>
      </div>
    </section>
  )
}
