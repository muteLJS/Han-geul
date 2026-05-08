// src/app/(main)/book-write/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '나의 책 쓰기' }

export default function BookWritePage() {
  return (
    <PageLayout hasBottomTab={false} className="pb-6">
      <header className="pt-6 pb-6">
        <h1 className="font-title text-2xl font-bold text-ink">나의 책 쓰기</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">쌓인 글을 챕터로 묶어 한 권의 책을 만들어요.</p>
      </header>
      <button type="button" className="h-14 w-full rounded-2xl bg-[#D4A853] font-body text-base font-bold text-white">새 책 시작하기</button>
    </PageLayout>
  )
}
