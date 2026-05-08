// src/app/(main)/subscribe/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '구독' }

export default function SubscribePage() {
  return (
    <PageLayout>
      <header className="pt-6 pb-6">
        <h1 className="font-title text-2xl font-bold text-ink">구독</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">더 깊은 글쓰기 도구를 열어보세요.</p>
      </header>
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="font-title text-xl font-bold text-ink">한-글 구독</p>
        <p className="mt-3 font-body text-sm leading-7 text-[#6B6560]">AI 피드백 무제한과 책 출간 기능을 준비 중이에요.</p>
        <button type="button" className="mt-6 h-12 w-full rounded-2xl bg-[#003478] font-body text-sm font-bold text-white">시작하기</button>
      </section>
    </PageLayout>
  )
}
