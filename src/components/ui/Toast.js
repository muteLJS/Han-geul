// src/components/ui/Toast.js
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

/**
 * type: 'success' | 'error' | 'info'
 * 상단 중앙에 표시, 2.5초 후 자동 사라짐
 *
 * 사용법:
 *   const [toast, setToast] = useState(null)
 *   setToast({ message: '저장됐어요', type: 'success' })
 *   <Toast toast={toast} onClose={() => setToast(null)} />
 */
export function Toast({ toast, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) return undefined

    const showTimer = window.setTimeout(() => {
      setVisible(true)
    }, 0)

    const hideTimer = window.setTimeout(() => {
      setVisible(false)
    }, 2500)

    const closeTimer = window.setTimeout(() => {
      onClose()
    }, 2800)

    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
      window.clearTimeout(closeTimer)
    }
  }, [toast, onClose])

  if (!toast) return null

  const types = {
    success: 'bg-[#3A3530] text-[#FAF6EE]',
    error:   'bg-[#CD2E3A] text-[#FAF6EE]',
    info:    'bg-[#4A7C8E] text-[#FAF6EE]',
  }

  const icons = {
    success: '✓',
    error:   '✕',
    info:    'ℹ',
  }

  return (
    <div
      className={cn(
        'fixed top-5 left-1/2 -translate-x-1/2 z-[100]',
        'flex items-center gap-2 px-5 py-3 rounded-full shadow-lg',
        'text-sm font-body font-medium',
        'transition-all duration-300',
        types[toast.type ?? 'success'],
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      )}
    >
      <span>{icons[toast.type ?? 'success']}</span>
      <span>{toast.message}</span>
    </div>
  )
}
