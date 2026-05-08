// src/app/(main)/library/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '도서함' }

export default function LibraryPage() {
  return (
    <PageLayout>
      <header className="pt-6 pb-6">
        <h1 className="font-title text-2xl font-bold text-ink">도서함</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">내 글이 책처럼 쌓이는 공간이에요.</p>
      </header>
      <section className="rounded-3xl bg-[#F5F0E8] p-5 text-center font-body text-sm text-[#6B6560]">
        아직 완성된 책이 없어요.
      </section>
    </PageLayout>
  )
}
