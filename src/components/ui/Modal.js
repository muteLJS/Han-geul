// src/components/ui/Modal.js
'use client'

import { useEffect } from 'react'
import { cn } from '@/utils/cn'

/**
 * type: 'center' | 'bottom'
 * - center: 화면 중앙 모달
 * - bottom: 모바일 바텀시트
 */
export function Modal({
  isOpen,
  onClose,
  children,
  type      = 'center',
  title     = '',
  className,
}) {
  // 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    // 딤 배경
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
      style={{ alignItems: type === 'center' ? 'center' : 'flex-end' }}
      onClick={onClose}
    >
      {/* 모달 본체 */}
      <div
        className={cn(
          'bg-[#FAF6EE] w-full relative',
          type === 'center'
            ? 'max-w-sm mx-4 rounded-2xl p-6'
            : 'rounded-t-2xl p-6 pb-10 max-w-lg mx-auto',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 바텀시트 핸들 */}
        {type === 'bottom' && (
          <div className="w-10 h-1 bg-[#3A3530]/20 rounded-full mx-auto mb-4" />
        )}

        {/* 타이틀 */}
        {title && (
          <h2 className="font-title text-lg font-semibold text-[#1A1714] mb-4">
            {title}
          </h2>
        )}

        {/* 닫기 버튼 (center 전용) */}
        {type === 'center' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#3A3530]/50 hover:text-[#1A1714] transition-colors"
            aria-label="닫기"
          >
            ✕
          </button>
        )}

        {children}
      </div>
    </div>
  )
}
