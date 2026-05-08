// src/app/(auth)/login/loading/page.js
'use client'

import { Hani } from '@/components/hani/Hani'

export default function SocialLoginLoadingPage() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-transparent px-6 text-center animate-fade-in">
      <Hani pose="default" face="happy" size={120} animate="shake" />
      <p className="mt-8 font-hani-bubble text-2xl text-[#6B6560]">
        로그인 중이에요...
      </p>
    </section>
  )
}
