// src/app/(main)/explore/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '탐색' }

const featuredBooks = [
  { title: '오늘의 문장들', author: '글쓴이', desc: '매일의 생각을 차곡차곡 모은 책' },
  { title: '작은 마음 사전', author: '붓끝이', desc: '나를 설명하는 단어들을 담은 책' },
]

export default function ExplorePage() {
  return (
    <PageLayout>
      <header className="pt-6 pb-5">
        <h1 className="font-title text-2xl font-bold text-ink">탐색</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">책과 작가를 발견해보세요.</p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-base font-bold text-ink">조회순 책</h2>
          <span className="font-body text-xs text-[#6B6560]">랜덤 추천</span>
        </div>

        {featuredBooks.map((book) => (
          <article key={book.title} className="rounded-2xl bg-[#F5F0E8] p-4">
            <p className="font-title text-lg font-bold text-ink">{book.title}</p>
            <p className="mt-1 font-body text-xs text-[#6B6560]">{book.author}</p>
            <p className="mt-3 font-body text-sm leading-7 text-ink/70">{book.desc}</p>
          </article>
        ))}
      </section>
    </PageLayout>
  )
}
