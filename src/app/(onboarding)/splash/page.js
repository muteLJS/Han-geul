// src/app/(onboarding)/splash/page.js
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Hani } from '@/components/hani/Hani'

export default function SplashPage() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'loading') return undefined

    const timer = window.setTimeout(() => {
      if (status === 'authenticated') {
        router.replace('/')
        return
      }

      router.replace('/intro')
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [router, status])

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-[#FAF6EE] px-8 text-center">
      <div className="flex flex-col items-center">
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <h1 className="font-title text-4xl font-bold tracking-tight text-ink">
            한-글
          </h1>
          <div className="mt-1 font-title text-xl leading-none text-[#D4A853]">
            ✦
          </div>
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
          className="mt-8 opacity-0 font-body text-sm text-[#6B6560] animate-fade-in"
          style={{ animationDelay: '1300ms' }}
        >
          하루에 한 자씩. 한 글로-
        </p>
      </div>
    </section>
  )
}
