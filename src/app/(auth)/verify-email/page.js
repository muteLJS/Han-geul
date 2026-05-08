// src/app/(auth)/verify-email/page.js
'use client'

import { useEffect, useState } from 'react'
import { Hani } from '@/components/hani/Hani'

export default function VerifyEmailPage() {
  const [secondsLeft, setSecondsLeft] = useState(60)
  const email = 'abc@gmail.com'

  useEffect(() => {
    if (secondsLeft <= 0) return undefined

    const timer = window.setTimeout(() => {
      setSecondsLeft((seconds) => seconds - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [secondsLeft])

  const resendEmail = () => {
    if (secondsLeft > 0) return
    setSecondsLeft(60)
  }

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-transparent px-6 text-center animate-fade-in">
      <div className="animate-hani-float text-[80px] leading-none" aria-hidden="true">
        ✉️
      </div>

      <h1 className="mt-8 font-title text-[22px] font-bold text-ink">
        이메일을 확인해주세요
      </h1>

      <p className="mt-5 font-body text-[15px] leading-8 text-[#6B6560]">
        {email} 으로<br />
        인증 메일을 보냈어요.<br />
        메일 속 링크를 클릭하면<br />
        가입이 완료돼요.
      </p>

      <div className="mt-8 font-body text-sm text-[#6B6560]">
        <p>메일을 받지 못했나요?</p>
        <button
          type="button"
          onClick={resendEmail}
          disabled={secondsLeft > 0}
          className="mt-2 font-bold text-[#003478] disabled:cursor-not-allowed disabled:text-[#9E9590]"
        >
          다시 보내기{secondsLeft > 0 ? ` (${secondsLeft}s)` : ''}
        </button>
      </div>

      <div className="mt-14 flex items-center gap-3 rounded-3xl bg-white px-5 py-4 shadow-sm">
        <Hani pose="default" face="happy" size={68} animate="float" />
        <p className="font-hani-bubble text-xl text-[#6B6560]">
          스팸함도 확인해보세요!
        </p>
      </div>
    </section>
  )
}
