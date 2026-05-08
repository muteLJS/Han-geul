// src/app/(main)/page.js
import { PageLayout } from '@/components/layout/PageLayout'
import { HomeDashboard } from '@/components/home/HomeDashboard'

export const metadata = { title: '홈' }

export default function HomePage() {
  const session = null

  const todayWordCount = 87
  const totalWritingCount = 1

  return (
    <PageLayout hasTopBar={false}>
      <HomeDashboard
        nickname={session?.user?.name ?? '글쓴이'}
        todayWordCount={todayWordCount}
        totalWritingCount={totalWritingCount}
        points={session?.user?.points ?? 1240}
      />
    </PageLayout>
  )
}
