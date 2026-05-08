// src/app/(main)/mypage/page.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '마이페이지' }

export default async function MyPage() {
  const session = await getServerSession(authOptions)
  const nickname = session?.user?.name ?? '글쓴이'

  return (
    <PageLayout>
      <header className="pt-6 pb-6">
        <h1 className="font-title text-2xl font-bold text-ink">마이페이지</h1>
        <p className="mt-2 font-body text-sm text-[#6B6560]">{nickname}님의 기록을 확인해요.</p>
      </header>
      <section className="space-y-3">
        {['내 기록', '구독 상태', '설정'].map((item) => (
          <div key={item} className="rounded-2xl bg-[#F5F0E8] px-4 py-4 font-body text-sm font-bold text-ink">{item}</div>
        ))}
      </section>
    </PageLayout>
  )
}
