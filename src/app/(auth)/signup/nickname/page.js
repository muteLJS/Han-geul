// src/app/(auth)/signup/nickname/page.js
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const nicknameSets = [
  ['글벗이', '먹물이', '붓끝이'],
  ['한줄이', '문장이', '책갈피'],
  ['글꽃이', '달문장', '잉크콩'],
]

export default function SignupNicknamePage() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [setIndex, setSetIndex] = useState(0)

  const suggestions = nicknameSets[setIndex]
  const canStart = nickname.trim().length >= 2 && nickname.trim().length <= 8

  const refreshSuggestions = () => {
    setSetIndex((index) => (index + 1) % nicknameSets.length)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canStart) return
    router.push('/verify-email')
  }

  return (
    <section className="flex min-h-dvh flex-col bg-[#FAF6EE] px-6 py-5 animate-fade-in">
      <header className="flex items-center justify-between font-body text-sm text-ink">
        <Link href="/signup" className="font-medium">← 뒤로</Link>
        <span className="font-bold text-[#6B6560]">2 / 2</span>
      </header>

      <form onSubmit={handleSubmit} className="mt-12 flex flex-1 flex-col">
        <div className="flex flex-col items-center text-center">
          <Hani pose="default" face="happy" size={90} animate="float" />

          <h1 className="mt-8 font-title text-[22px] font-bold text-ink">
            어떻게 불러드릴까요?
          </h1>
          <p className="mt-3 font-body text-sm leading-7 text-[#6B6560]">
            나중에 설정에서 바꿀 수<br />있어요.
          </p>
        </div>

        <div className="mt-10">
          <label className="block font-body text-sm font-bold text-ink">
            닉네임
            <div className="mt-2 flex h-[52px] items-center rounded-xl bg-[#F5F1EA] px-4 focus-within:ring-[1.5px] focus-within:ring-[#003478]">
              <input
                type="text"
                value={nickname}
                maxLength={8}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="2~8자로 입력해주세요"
                className="min-w-0 flex-1 font-body text-sm outline-none"
              />
              <span className="font-body text-xs text-[#9E9590]">{nickname.length}/8</span>
            </div>
          </label>

          <div className="mt-7">
            <p className="font-body text-sm font-bold text-ink">이런 이름은 어때요?</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setNickname(suggestion)}
                  className="rounded-full bg-[#F5F1EA] px-4 py-2 font-body text-[13px] font-medium text-[#6B6560]"
                >
                  {suggestion}
                </button>
              ))}
              <button
                type="button"
                onClick={refreshSuggestions}
                aria-label="추천 닉네임 새로고침"
                className="rounded-full bg-[#F5F1EA] px-3 py-2 text-sm"
              >
                🔄
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canStart}
          className={cn(
            'mt-auto h-14 w-full rounded-2xl font-body text-base font-bold transition-colors',
            canStart ? 'bg-[#003478] text-white' : 'cursor-not-allowed bg-[#E8E2D9] text-[#9E9590]',
          )}
        >
          한-글 시작하기 →
        </button>
      </form>
    </section>
  )
}
