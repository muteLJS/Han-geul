// src/components/ui/Toast.js
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

export function Toast({ toast, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) return undefined
    const showTimer = window.setTimeout(() => setVisible(true), 0)
    const hideTimer = window.setTimeout(() => setVisible(false), toast.duration ?? 2000)
    const closeTimer = window.setTimeout(() => onClose?.(), (toast.duration ?? 2000) + 300)
    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
      window.clearTimeout(closeTimer)
    }
  }, [toast, onClose])

  if (!toast) return null

  const type = toast.type ?? 'success'
  const position = toast.position ?? (type === 'point' ? 'point' : 'top')
  const styles = {
    success: 'bg-[rgba(26,26,46,0.85)] text-white',
    point: 'bg-[#D4A853] text-white',
    error: 'bg-[#CD2E3A] text-white',
  }
  const icons = { success: '✓', point: '✨', error: '✕' }

  return (
    <div
      className={cn(
        'fixed z-[100] flex items-center gap-2 rounded-[20px] px-4 py-2.5 font-body text-sm font-bold shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all',
        position === 'point' ? 'right-4 top-[calc(env(safe-area-inset-top)+16px)] duration-200' : 'left-1/2 top-[calc(env(safe-area-inset-top)+16px)] -translate-x-1/2 duration-300',
        styles[type],
        visible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : position === 'point'
            ? 'translate-x-2 opacity-0'
            : '-translate-y-2 opacity-0',
      )}
    >
      <span aria-hidden="true">{icons[type]}</span>
      <span>{toast.message}</span>
    </div>
  )
}
