// src/app/(main)/self-writing/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '나를 담은 글' }

export default function SelfWritingPage() {
  return (
    <PageLayout hasBottomTab={false} className="pb-6">
      <header className="pt-6 pb-6">
        <h1 className="font-title text-2xl font-bold text-ink">나를 담은 글</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">질문을 따라 나만의 언어를 찾아요.</p>
      </header>
      <article className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="font-body text-base leading-8 text-ink">요즘 가장 자주 떠오르는 생각은 무엇인가요?</p>
      </article>
    </PageLayout>
  )
}
