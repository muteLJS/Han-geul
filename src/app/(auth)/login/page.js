// src/app/(auth)/login/page.js
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('이메일 또는 비밀번호가 올바르지 않아요.')
  }

  const handleSocialLogin = (provider) => {
    signIn(provider, { callbackUrl: '/' })
  }

  return (
    <section className="flex min-h-dvh flex-col bg-transparent animate-fade-in">
      <div className="flex min-h-[40dvh] flex-col items-center justify-center px-6 py-10 text-center">
        <h1 className="font-title text-4xl font-bold text-ink">한-글</h1>
        <Hani pose="default" face="happy" size={68} animate="float" className="mt-5" />
        <p className="mt-3 font-hani-bubble text-2xl text-[#6B6560]">
          다시 오셨군요.
        </p>
      </div>

      <div className="flex flex-1 flex-col rounded-t-[24px] bg-white px-6 py-8 shadow-[0_-8px_24px_rgba(26,23,20,0.04)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block font-body text-sm font-bold text-ink">
            이메일
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력해주세요"
              className="mt-2 h-[52px] w-full rounded-xl bg-[#F5F0E8] px-4 font-body text-sm outline-none transition-shadow focus:ring-[1.5px] focus:ring-[#003478]"
            />
          </label>

          <label className="block font-body text-sm font-bold text-ink">
            비밀번호
            <div className="mt-2 flex h-[52px] items-center rounded-xl bg-[#F5F0E8] px-4 transition-shadow focus-within:ring-[1.5px] focus-within:ring-[#003478]">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className="min-w-0 flex-1 font-body text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                className="text-lg"
              >
                👁
              </button>
            </div>
          </label>

          {errorMessage && (
            <p className="font-body text-[13px] text-[#CD2E3A]">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="h-14 w-full rounded-2xl bg-[#003478] font-body text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            로그인
          </button>
        </form>

        <Link
          href="/forgot-password"
          className="mt-4 text-center font-body text-sm text-[#6B6560]"
        >
          비밀번호를 잊으셨나요?
        </Link>

        <div className="my-6 flex items-center gap-3 font-body text-xs text-[#9E9590]">
          <span className="h-px flex-1 bg-[#E8E2D9]" />
          또는
          <span className="h-px flex-1 bg-[#E8E2D9]" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('kakao')}
            className="h-[52px] w-full rounded-xl bg-[#FEE500] font-body text-sm font-bold text-[#1A1714]"
          >
            🟡 카카오로 계속하기
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="h-[52px] w-full rounded-xl border border-[#E8E2D9] bg-white font-body text-sm font-bold text-ink"
          >
            G&nbsp;&nbsp; Google로 계속하기
          </button>
          <button
            type="button"
            disabled
            className={cn(
              'h-[52px] w-full rounded-xl bg-[#1A1714] font-body text-sm font-bold text-white',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            🍎 Apple로 계속하기
          </button>
        </div>

        <p className="mt-6 text-center font-body text-sm text-[#6B6560]">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="font-bold text-[#003478]">
            회원가입
          </Link>
        </p>
      </div>
    </section>
  )
}
