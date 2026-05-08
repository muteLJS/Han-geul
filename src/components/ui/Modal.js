// src/components/ui/Modal.js
'use client'

import { useEffect } from 'react'
import { cn } from '@/utils/cn'

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  destructive = false,
  showActions = false,
  type = 'center',
  className,
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  if (type === 'bottom') {
    return <BottomSheet isOpen={isOpen} onClose={onClose} title={title} className={className}>{children}</BottomSheet>
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6" onClick={onClose}>
      <section
        className={cn('w-full max-w-sm animate-modal-pop rounded-[20px] bg-white p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)]', className)}
        onClick={(event) => event.stopPropagation()}
      >
        {title && <h2 className="text-center font-title text-lg font-bold text-ink">{title}</h2>}
        <div className={cn('font-body text-sm leading-[1.6] text-ink/70', title && 'mt-5')}>{children}</div>
        {showActions && (
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button type="button" onClick={onClose} className="h-12 rounded-[14px] border border-[#E8E2D9] font-body text-sm font-bold text-[#6B6560]">{cancelLabel}</button>
            <button type="button" onClick={onConfirm} className={cn('h-12 rounded-[14px] font-body text-sm font-bold text-white', destructive ? 'bg-[#CD2E3A]' : 'bg-[#003478]')}>{confirmLabel}</button>
          </div>
        )}
      </section>
    </div>
  )
}

export function BottomSheet({ isOpen, onClose, title, children, size = 'medium', className }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const heights = { small: 'min-h-[30dvh]', medium: 'min-h-[50dvh]', large: 'min-h-[70dvh]', full: 'min-h-[90dvh]' }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <section
        className={cn('w-full max-w-lg animate-sheet-up rounded-t-[24px] bg-white p-5 pb-[calc(env(safe-area-inset-bottom)+20px)] shadow-[0_-8px_24px_rgba(0,0,0,0.06)]', heights[size], className)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-8 rounded-full bg-[#E8E2D9]" />
        {title && <h2 className="mb-5 font-title text-lg font-bold text-ink">{title}</h2>}
        {children}
      </section>
    </div>
  )
}
