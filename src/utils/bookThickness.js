// src/utils/bookThickness.js
import { bookThickness } from '@/styles/tokens'

/**
 * 글자 수를 받아서 책 두께 정보를 반환
 * @param {number} wordCount
 * @returns {{ level: number, label: string, widthPx: number, tailwindW: string }}
 */
export function getBookThickness(wordCount = 0) {
  const match = bookThickness.find(t => wordCount <= t.maxWords)
  const result = match || bookThickness[bookThickness.length - 1]

  // Tailwind 인라인 스타일용 px값도 함께 반환
  return {
    ...result,
    style: { width: `${result.widthPx}px` },
  }
}
