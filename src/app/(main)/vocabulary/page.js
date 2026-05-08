// src/app/(main)/vocabulary/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '어휘 연습' }

export default function VocabularyPage() {
  return (
    <PageLayout hasBottomTab={false} className="pb-6">
      <header className="pt-6 pb-6">
        <h1 className="font-title text-2xl font-bold text-ink">어휘 연습</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">새로운 낱말을 익혀 표현을 넓혀요.</p>
      </header>
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="font-title text-xl font-bold text-ink">오늘의 낱말</p>
        <p className="mt-3 font-body text-sm text-[#6B6560]">호젓하다 · 한적하고 쓸쓸하다</p>
      </section>
    </PageLayout>
  )
}
