// src/app/(onboarding)/intro/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'

const slides = [
  {
    title: '글쓰기가 어렵게 느껴졌나요?',
    description: '잘 쓰는 것보다 꾸준히 쓰는 게 먼저에요.',
  },
  {
    title: '평가 없이, 제안만 해요.',
    description: '한이가 틀렸다고 말하는 대신\n더 나은 표현을 함께 찾아드려요.',
  },
  {
    title: '매일 쌓인 글이 나만의 책이 돼요.',
    description: '100자부터 시작해서\n언젠가 한 권의 책이 완성돼요.',
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
      className="relative flex min-h-dvh flex-col bg-transparent px-6 animate-fade-in"
      onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
      onTouchEnd={handleTouchEnd}
    >
      <header className="flex h-[72px] shrink-0 items-center justify-end pt-4">
        <button
          type="button"
          onClick={goToLogin}
          className="font-title text-[14px] leading-none text-ink transition-colors hover:text-ink/70"
        >
          건너뛰기
        </button>
      </header>

      <main className="flex flex-1 flex-col justify-end pb-[27dvh] text-center">
        <h1 className="whitespace-pre-line font-title text-[23px] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
          {currentSlide.title}
        </h1>
        <p className="mt-4 whitespace-pre-line font-title text-[14px] leading-[1.55] tracking-[-0.02em] text-ink/80">
          {currentSlide.description}
        </p>
      </main>

      <footer className="absolute inset-x-6 bottom-[5.8dvh]">
        <div className="mb-[18px] flex items-center justify-center gap-[14px]">
          {slides.map((slide, index) => (
            <span
              key={slide.title}
              aria-label={`${index + 1}번째 슬라이드`}
              className={cn(
                'h-3 w-3 rounded-full border border-[#BFB8AE] transition-colors',
                index === currentIndex ? 'border-[#003478] bg-[#003478]' : 'bg-transparent',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="flex h-14 w-full items-center justify-center rounded-[10px] bg-[#003478] font-title text-[16px] font-bold leading-none text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          다음 →
        </button>
      </footer>
    </section>
  )
}
