// src/app/(onboarding)/splash/page.js
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'

export default function SplashPage() {
  const router = useRouter()
  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace('/intro')
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [router])

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-transparent px-8 text-center">
      <div className="flex flex-col items-center">
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <h1 className="font-title text-4xl font-bold tracking-tight text-ink">
            한<span className="text-[#003478]">-</span>글
          </h1>
        </div>

        <Hani
          pose="default"
          face="happy"
          size={90}
          animate="none"
          className="mt-10 opacity-0 animate-hani-drop"
          style={{ animationDelay: '600ms' }}
        />

        <p
          className="mt-8 opacity-0 font-title text-sm text-ink animate-fade-in"
          style={{ animationDelay: '1300ms' }}
        >
          하루에 한 자씩. 한 글로-
        </p>
      </div>
    </section>
  )
}
