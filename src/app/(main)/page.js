// src/app/(main)/page.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import WritingEntry from '@/models/WritingEntry'

import { PageLayout }      from '@/components/layout/PageLayout'
import { HomeHeader }      from '@/components/home/HomeHeader'
import { ObangButtons }    from '@/components/home/ObangButtons'
import { MissionSection }  from '@/components/home/MissionSection'
import { RecentWritings }  from '@/components/home/RecentWritings'

export const metadata = { title: '홈' }

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  let recentWritings    = []
  let completedMissions = []

  if (session?.user?.id) {
    await connectDB()

    // 최근 글 3개
    recentWritings = await WritingEntry
      .find({ authorId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title body wordCount createdAt')
      .lean()

    // 오늘 완료 미션 (오늘 날짜 기준)
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const todayWritings = await WritingEntry
      .find({
        authorId:  session.user.id,
        createdAt: { $gte: todayStart },
        isDraft:   false,
      })
      .lean()

    const todayWordCount = todayWritings.reduce((sum, w) => sum + (w.wordCount ?? 0), 0)
    const hasCopying     = todayWritings.some(w => w.type === 'copying')

    if (todayWordCount >= 100)  completedMissions.push('write100')
    if (hasCopying)             completedMissions.push('copying')
  }

  return (
    <PageLayout hasTopBar={false}>
      <HomeHeader />
      <ObangButtons />
      <MissionSection completedMissions={completedMissions} />
      <RecentWritings writings={recentWritings} />
    </PageLayout>
  )
}
