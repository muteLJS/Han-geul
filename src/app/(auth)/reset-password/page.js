// src/app/(auth)/reset-password/page.js
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

function getPasswordStrength(password) {
  const hasLetter = /[A-Za-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const isLongEnough = password.length >= 8

  if (hasLetter && hasNumber && isLongEnough && password.length >= 12) {
    return { label: '강함', level: 3, color: 'bg-green-500' }
  }

  if (hasLetter && hasNumber && isLongEnough) {
    return { label: '보통', level: 2, color: 'bg-orange-400' }
  }

  return { label: '약함', level: password ? 1 : 0, color: 'bg-[#CD2E3A]' }
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [changed, setChanged] = useState(false)

  const strength = useMemo(() => getPasswordStrength(password), [password])
  const canChange = strength.level >= 2 && password === passwordConfirm

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canChange) return
    setChanged(true)
  }

  return (
    <section className="flex min-h-dvh flex-col bg-[#FAF6EE] px-6 py-5 animate-fade-in">
      <header className="text-center font-title text-xl font-bold text-ink">
        비밀번호 재설정
      </header>

      {!changed ? (
        <form onSubmit={handleSubmit} className="mt-12 flex flex-1 flex-col">
          <p className="font-body text-base text-ink">새 비밀번호를 입력해주세요</p>

          <label className="mt-10 block font-body text-sm font-bold text-ink">
            새 비밀번호
            <div className="mt-2 flex h-[52px] items-center rounded-xl bg-[#F5F1EA] px-4 focus-within:ring-[1.5px] focus-within:ring-[#003478]">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-w-0 flex-1 text-sm outline-none"
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-lg">👁</button>
            </div>
          </label>

          <div className="mt-3 flex items-center gap-2 font-body text-xs text-[#6B6560]">
            <span>{strength.label}</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={cn(
                    'h-2 w-8 rounded-full',
                    level <= strength.level ? strength.color : 'bg-[#E8E2D9]',
                  )}
                />
              ))}
            </div>
          </div>

          <label className="mt-8 block font-body text-sm font-bold text-ink">
            새 비밀번호 확인
            <div className="mt-2 flex h-[52px] items-center rounded-xl bg-[#F5F1EA] px-4 focus-within:ring-[1.5px] focus-within:ring-[#003478]">
              <input
                type="password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                className="min-w-0 flex-1 text-sm outline-none"
              />
              {passwordConfirm && password === passwordConfirm && <span className="text-green-600">✓</span>}
            </div>
          </label>

          <button
            type="submit"
            disabled={!canChange}
            className={cn(
              'mt-8 h-14 w-full rounded-2xl font-body text-base font-bold transition-colors',
              canChange ? 'bg-[#003478] text-white' : 'cursor-not-allowed bg-[#E8E2D9] text-[#9E9590]',
            )}
          >
            비밀번호 변경
          </button>
        </form>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">✓</div>
          <h1 className="mt-6 font-title text-[22px] font-bold text-ink">비밀번호가 바뀌었어요</h1>
          <Link href="/login" className="mt-10 flex h-14 w-full items-center justify-center rounded-2xl bg-[#003478] font-body text-base font-bold text-white">
            로그인으로 돌아가기
          </Link>
        </div>
      )}
    </section>
  )
}
