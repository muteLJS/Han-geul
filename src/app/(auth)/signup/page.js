// src/app/(auth)/signup/page.js
'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'

function getPasswordStrength(password) {
  if (!password) return { label: '약함', level: 0, color: 'bg-[#CD2E3A]' }

  const hasLetter = /[A-Za-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const isLongEnough = password.length >= 8

  if (hasLetter && hasNumber && isLongEnough && password.length >= 12) {
    return { label: '강함', level: 3, color: 'bg-green-500' }
  }

  if (hasLetter && hasNumber && isLongEnough) {
    return { label: '보통', level: 2, color: 'bg-orange-400' }
  }

  return { label: '약함', level: 1, color: 'bg-[#CD2E3A]' }
}

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })

  const strength = useMemo(() => getPasswordStrength(password), [password])
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = strength.level >= 2
  const isPasswordConfirmed = password.length > 0 && password === passwordConfirm
  const canContinue = isEmailValid && isPasswordValid && isPasswordConfirmed && agreements.terms && agreements.privacy
  const allAgreed = agreements.terms && agreements.privacy && agreements.marketing

  const toggleAgreement = (key) => {
    setAgreements((current) => ({ ...current, [key]: !current[key] }))
  }

  const toggleAll = () => {
    const nextValue = !allAgreed
    setAgreements({ terms: nextValue, privacy: nextValue, marketing: nextValue })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canContinue) return
    router.push('/signup/nickname')
  }

  return (
    <section className="flex min-h-dvh flex-col bg-transparent px-6 py-5 animate-fade-in">
      <header className="flex items-center justify-between font-body text-sm text-ink">
        <Link href="/login" className="font-medium">← 뒤로</Link>
        <span className="font-bold text-[#6B6560]">1 / 2</span>
      </header>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-1 flex-col">
        <div>
          <h1 className="font-title text-2xl font-bold text-ink">계정을 만들어요</h1>
          <p className="mt-3 font-body text-sm leading-7 text-[#6B6560]">
            이메일과 비밀번호를<br />입력해주세요.
          </p>

          <div className="mt-8 space-y-5">
            <label className="block font-body text-sm font-bold text-ink">
              이메일
              <div className="mt-2 flex h-[52px] items-center rounded-xl bg-[#F5F0E8] px-4 focus-within:ring-[1.5px] focus-within:ring-[#003478]">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-w-0 flex-1 text-sm outline-none"
                />
                {isEmailValid && <span className="text-green-600">✓</span>}
              </div>
            </label>

            <label className="block font-body text-sm font-bold text-ink">
              비밀번호
              <div className="mt-2 flex h-[52px] items-center rounded-xl bg-[#F5F0E8] px-4 focus-within:ring-[1.5px] focus-within:ring-[#003478]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-w-0 flex-1 text-sm outline-none"
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-lg">👁</button>
              </div>
              <p className="mt-2 text-xs font-medium text-[#6B6560]">영문 · 숫자 포함 8자 이상</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-[#6B6560]">
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
            </label>

            <label className="block font-body text-sm font-bold text-ink">
              비밀번호 확인
              <div className="mt-2 flex h-[52px] items-center rounded-xl bg-[#F5F0E8] px-4 focus-within:ring-[1.5px] focus-within:ring-[#003478]">
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  className="min-w-0 flex-1 text-sm outline-none"
                />
                {isPasswordConfirmed && <span className="text-green-600">✓</span>}
              </div>
            </label>
          </div>
        </div>

        <div className="mt-auto space-y-3 pb-2 pt-8 font-body text-sm text-ink">
          <label className="flex items-center gap-2 font-bold">
            <input type="checkbox" checked={allAgreed} onChange={toggleAll} />
            전체 동의
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={agreements.terms} onChange={() => toggleAgreement('terms')} />
            [필수] 이용약관
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={agreements.privacy} onChange={() => toggleAgreement('privacy')} />
            [필수] 개인정보처리방침
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={agreements.marketing} onChange={() => toggleAgreement('marketing')} />
            [선택] 마케팅 수신
          </label>

          <button
            type="submit"
            disabled={!canContinue}
            className={cn(
              'mt-4 h-14 w-full rounded-2xl font-body text-base font-bold transition-colors',
              canContinue ? 'bg-[#003478] text-white' : 'cursor-not-allowed bg-[#E8E2D9] text-[#9E9590]',
            )}
          >
            다음 →
          </button>
        </div>
      </form>
    </section>
  )
}
