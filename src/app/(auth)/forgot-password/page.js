// src/app/(auth)/forgot-password/page.js
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="flex min-h-dvh flex-col bg-transparent px-6 py-5 animate-fade-in">
      <header className="grid grid-cols-3 items-center font-body text-sm text-ink">
        <Link href="/login" className="font-medium">← 뒤로</Link>
        <h1 className="text-center font-bold">비밀번호 찾기</h1>
        <span />
      </header>

      {!sent ? (
        <form onSubmit={handleSubmit} className="mt-12 flex flex-1 flex-col">
          <p className="font-body text-base leading-8 text-ink">
            가입한 이메일을 입력하면<br />
            비밀번호 재설정 링크를<br />
            보내드려요.
          </p>

          <label className="mt-10 block font-body text-sm font-bold text-ink">
            이메일
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 h-[52px] w-full rounded-xl bg-[#F5F0E8] px-4 text-sm outline-none focus:ring-[1.5px] focus:ring-[#003478]"
            />
          </label>

          <button
            type="submit"
            className="mt-6 h-14 w-full rounded-2xl bg-[#003478] font-body text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            재설정 링크 보내기
          </button>
        </form>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
            ✓
          </div>
          <h2 className="mt-6 font-title text-[22px] font-bold text-ink">
            메일을 보냈어요!
          </h2>
          <Link
            href="/login"
            className="mt-10 flex h-14 w-full items-center justify-center rounded-2xl bg-[#003478] font-body text-base font-bold text-white"
          >
            로그인으로 돌아가기
          </Link>
        </div>
      )}
    </section>
  )
}
