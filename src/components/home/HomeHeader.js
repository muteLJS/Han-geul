// src/components/home/HomeHeader.js
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function HomeHeader() {
  const { data: session } = useSession()
  const nickname = session?.user?.name ?? '글쓴이'

  // 시간대별 인사말
  const hour = new Date().getHours()
  const greeting =
    hour < 6  ? '밤이 깊었네요.' :
    hour < 12 ? '좋은 아침이에요.' :
    hour < 18 ? '오늘도 한 줄 써볼까요.' :
                '오늘 하루 수고했어요.'

  return (
    <header className="flex items-center justify-between pt-6 pb-4">
      {/* 왼쪽: 인사말 */}
      <div>
        <p className="text-xs text-[#3A3530]/50 font-body mb-0.5">{greeting}</p>
        <h2 className="text-xl font-title font-bold text-[#1A1714]">
          {nickname}님의 글쓰기
        </h2>
      </div>

      {/* 오른쪽: 포인트 + 마이페이지 */}
      <Link
        href="/mypage"
        className="flex flex-col items-end gap-1"
      >
        {session && (
          <span className="text-xs font-body text-[#D4A853] font-medium">
            ✦ {session.user?.points ?? 0}P
          </span>
        )}
        {/* 프로필 이미지 or 기본 아바타 */}
        <div className="w-10 h-10 rounded-full bg-[#F5F0E8] border border-[#3A3530]/10 overflow-hidden flex items-center justify-center">
          {session?.user?.image ? (
            <span
              aria-label="프로필"
              role="img"
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${session.user.image})` }}
            />
          ) : (
            <span className="text-lg">🖊</span>
          )}
        </div>
      </Link>
    </header>
  )
}
