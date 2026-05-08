// src/components/ui/Card.js
import { cn } from '@/utils/cn'

/**
 * variant: 'default' | 'flat' | 'bordered'
 * 클릭 가능한 카드는 onClick 전달
 */
export function Card({
  children,
  variant   = 'default',
  onClick,
  className,
  ...props
}) {
  const base = `
    hanji-bg rounded-2xl
    transition-all duration-150
  `

  const variants = {
    default:  'shadow-sm hover:shadow-md',
    flat:     'bg-[#F5F0E8]',
    bordered: 'border border-[#3A3530]/15',
  }

  const clickable = onClick
    ? 'cursor-pointer active:scale-[0.98]'
    : ''

  return (
    <div
      className={cn(base, variants[variant], clickable, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}
