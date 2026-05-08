// src/utils/cn.js

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn() — 조건부 클래스 + Tailwind 충돌 해결 유틸
 *
 * clsx: 조건부 클래스 조합
 *   cn('text-sm', isActive && 'text-tg-blue')
 *
 * twMerge: 같은 속성의 Tailwind 클래스 충돌 제거
 *   cn('px-4 px-6') → 'px-6' (마지막 우선)
 *   cn('text-red-500', 'text-blue-500') → 'text-blue-500'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
