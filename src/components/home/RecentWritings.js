// src/components/home/RecentWritings.js
import Link from 'next/link'
import { Card } from '@/components/ui/Card'

export function RecentWritings({ writings = [] }) {
  if (writings.length === 0) {
    return (
      <section className="mb-6">
        <h3 className="text-sm font-title font-semibold text-[#1A1714] mb-3">
          최근 글
        </h3>
        <Card variant="flat" className="px-4 py-8 text-center">
          <p className="text-sm text-[#3A3530]/40 font-body">
            아직 쓴 글이 없어요.<br />
            첫 글을 써볼까요?
          </p>
        </Card>
      </section>
    )
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-title font-semibold text-[#1A1714]">
          최근 글
        </h3>
        <Link
          href="/library"
          className="text-xs text-[#3A3530]/40 font-body hover:text-[#1A1714] transition-colors"
        >
          전체 보기
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {writings.slice(0, 3).map((writing) => (
          <li key={writing._id}>
            <Link href={`/posts/${writing._id}`}>
              <Card
                variant="bordered"
                className="px-4 py-3 hover:shadow-sm transition-shadow"
              >
                {/* 제목 */}
                <p className="text-sm font-body font-medium text-[#1A1714] truncate mb-1">
                  {writing.title || '제목 없음'}
                </p>

                {/* 본문 미리보기 */}
                <p className="text-xs text-[#3A3530]/50 font-body line-clamp-2 leading-relaxed">
                  {writing.body}
                </p>

                {/* 메타 */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-[#3A3530]/30 font-body">
                    {writing.wordCount}자
                  </span>
                  <span className="text-[10px] text-[#3A3530]/20">·</span>
                  <span className="text-[10px] text-[#3A3530]/30 font-body">
                    {new Date(writing.createdAt).toLocaleDateString('ko-KR', {
                      month: 'numeric',
                      day:   'numeric',
                    })}
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
