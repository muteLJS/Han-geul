// src/components/hani/Hani.js
// 최종 조합 컴포넌트 — 애니메이션 포함

import { cn } from '@/utils/cn'
import { HaniSVG } from './HaniSVG'

/**
 * animate:
 *   'none'    → 정적
 *   'float'   → 둥실둥실 (기본)
 *   'bounce'  → 통통 (기쁨)
 *   'shake'   → 좌우 흔들 (놀람)
 *   'nod'     → 끄덕끄덕 (응원)
 */
export function Hani({
  pose      = 'default',
  face      = 'default',
  size      = 90,
  animate   = 'float',
  className = '',
  style     = {},
}) {
  const animationClass = {
    none:   '',
    float:  'animate-hani-float',
    bounce: 'animate-hani-bounce',
    shake:  'animate-hani-shake',
    nod:    'animate-hani-nod',
  }[animate] ?? ''

  return (
    <div
      className={cn('inline-flex items-center justify-center', animationClass, className)}
      style={style}
    >
      <HaniSVG pose={pose} face={face} size={size} />
    </div>
  )
}
