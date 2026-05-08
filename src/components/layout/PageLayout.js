// src/components/layout/PageLayout.js
import { cn } from '@/utils/cn'

/**
 * 모든 페이지의 공통 래퍼
 * - 상단바 높이(pt-14) + 하단탭 높이(pb-20) 자동 적용
 * - maxWidth 중앙 정렬
 *
 * hasTopBar:    상단바 있으면 true (pt-14 추가)
 * hasBottomTab: 하단탭 있으면 true (pb-20 추가)
 * noPadding:    좌우 패딩 제거 (전체 너비 컨텐츠용)
 */
export function PageLayout({
  children,
  hasTopBar    = true,
  hasBottomTab = true,
  noPadding    = false,
  className,
}) {
  return (
    <main
      className={cn(
        'min-h-screen bg-[#FAF6EE]',
        'w-full max-w-lg mx-auto',
        hasTopBar    && 'pt-14',
        hasBottomTab && 'pb-20',
        !noPadding   && 'px-4',
        className
      )}
    >
      {children}
    </main>
  )
}
