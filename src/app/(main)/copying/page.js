// src/app/(main)/copying/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '필사' }

export default function CopyingPage() {
  return (
    <PageLayout hasBottomTab={false} className="pb-6">
      <header className="pt-6 pb-6">
        <h1 className="font-title text-2xl font-bold text-ink">필사</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">좋은 문장을 따라 쓰며 호흡을 익혀요.</p>
      </header>
      <article className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="font-title text-lg leading-9 text-ink">천천히 쓰는 문장에는 마음이 머무를 자리가 생겨요.</p>
      </article>
      <textarea className="mt-5 min-h-[40dvh] w-full rounded-3xl bg-[#F5F0E8] p-5 font-body leading-8 outline-none" placeholder="위 문장을 따라 써보세요." />
    </PageLayout>
  )
}
