// src/components/layout/TopBar.js
'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'

/**
 * variant: 'default' | 'transparent' | 'writing'
 * - default:     흰 배경, 그림자
 * - transparent: 투명 (홈 상단용)
 * - writing:     글쓰기 화면 전용 (저장 상태 표시)
 */
export function TopBar({
  title,
  showBack    = false,
  onBack,
  rightAction = null,   // JSX 노드
  variant     = 'default',
  saveStatus,           // 'idle' | 'saving' | 'saved' | 'error' (writing 전용)
  className,
}) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const saveLabels = {
    idle:   '',
    saving: '저장 중...',
    saved:  '저장됨',
    error:  '저장 실패',
  }

  const saveColors = {
    idle:   '',
    saving: 'text-[#3A3530]/40',
    saved:  'text-[#4A7C8E]',
    error:  'text-[#CD2E3A]',
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 h-14',
        'flex items-center justify-between px-4',
        'max-w-lg mx-auto',
        variant === 'default'     && 'bg-[#FAF6EE] border-b border-[#3A3530]/10',
        variant === 'transparent' && 'bg-transparent',
        variant === 'writing'     && 'bg-[#FAF6EE] border-b border-[#3A3530]/10',
        className
      )}
    >
      {/* 왼쪽: 뒤로가기 or 빈 공간 */}
      <div className="w-10">
        {showBack && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 -ml-2 text-[#1A1714]"
            aria-label="뒤로가기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M13 4L7 10L13 16"
                stroke="#1A1714"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 가운데: 타이틀 or 저장 상태 */}
      <div className="flex-1 text-center">
        {variant === 'writing' && saveStatus ? (
          <span className={cn('text-xs font-body', saveColors[saveStatus])}>
            {saveLabels[saveStatus]}
          </span>
        ) : (
          <h1 className="text-base font-title font-semibold text-[#1A1714] truncate px-2">
            {title}
          </h1>
        )}
      </div>

      {/* 오른쪽: 액션 버튼 */}
      <div className="w-10 flex justify-end">
        {rightAction}
      </div>
    </header>
  )
}
