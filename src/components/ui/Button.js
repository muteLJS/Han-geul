// src/components/ui/Button.js
import { cn } from '@/utils/cn'

/**
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * size:    'sm' | 'md' | 'lg'
 */
export function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  disabled = false,
  fullWidth = false,
  className,
  onClick,
  type = 'button',
  ...props
}) {
  const base = `
    inline-flex items-center justify-center
    font-body font-medium rounded-full
    transition-all duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003478]
    disabled:opacity-40 disabled:cursor-not-allowed
  `

  const variants = {
    primary:   'bg-[#003478] text-[#FAF6EE] hover:bg-[#002560] active:scale-95',
    secondary: 'hanji-bg text-[#1A1714] border border-[#3A3530] hover:bg-[#F5F0E8] active:scale-95',
    ghost:     'bg-transparent text-[#1A1714] hover:bg-[#F5F0E8] active:scale-95',
    danger:    'bg-[#CD2E3A] text-[#FAF6EE] hover:bg-[#b02530] active:scale-95',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 h-8',
    md: 'text-sm px-5 py-2   h-10',
    lg: 'text-base px-6 py-3 h-12',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
