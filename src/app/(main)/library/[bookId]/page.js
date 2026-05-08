// src/app/(main)/library/[bookId]/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '책 상세' }

export default async function LibraryBookPage({ params }) {
  const { bookId } = await params

  return (
    <PageLayout>
      <header className="pt-6 pb-6">
        <p className="font-body text-xs text-[#6B6560]">{bookId}</p>
        <h1 className="mt-2 font-title text-2xl font-bold text-ink">책 상세</h1>
      </header>
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="font-body text-sm leading-7 text-[#6B6560]">표지와 챕터가 이곳에 표시돼요.</p>
      </section>
    </PageLayout>
  )
}
