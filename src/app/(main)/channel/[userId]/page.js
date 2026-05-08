// src/app/(main)/channel/[userId]/page.js
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '작가 채널' }

export default async function ChannelPage({ params }) {
  const { userId } = await params

  return (
    <PageLayout>
      <header className="pt-6 pb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F0E8] text-2xl">🖊</div>
        <h1 className="mt-4 font-title text-2xl font-bold text-ink">작가 채널</h1>
        <p className="mt-1 font-body text-xs text-[#6B6560]">{userId}</p>
      </header>
      <section className="rounded-3xl bg-[#F5F0E8] p-5 text-center font-body text-sm text-[#6B6560]">
        공개된 책과 글이 이곳에 모여요.
      </section>
    </PageLayout>
  )
}
