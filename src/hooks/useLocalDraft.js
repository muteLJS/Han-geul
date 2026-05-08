// src/hooks/useLocalDraft.js
import { useCallback } from 'react'

const DRAFT_KEY = 'han-geul-draft'

/**
 * 비회원 로컬 임시저장
 * - 저장: saveDraft()
 * - 불러오기: loadDraft()
 * - 삭제: clearDraft()
 * - 로그인 후 자동 연동: syncDraftToServer()
 */
export function useLocalDraft() {

  const saveDraft = useCallback((data) => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        title:   data.title   || '',
        content: data.content || '',
        savedAt: new Date().toISOString(),
      }))
    } catch (err) {
      console.error('로컬 저장 실패:', err)
    }
  }, [])

  const loadDraft = useCallback(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY)
  }, [])

  const hasDraft = useCallback(() => {
    return !!localStorage.getItem(DRAFT_KEY)
  }, [])

  /**
   * 로그인 후 로컬 임시저장 글을 서버로 자동 연동
   * 로그인 직후 한 번만 호출
   */
  const syncDraftToServer = useCallback(async () => {
    const draft = loadDraft()
    if (!draft?.content?.trim()) return false

    try {
      const res = await fetch('/api/posts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title:   draft.title,
          body:    draft.content,
          isDraft: true,
        }),
      })

      if (res.ok) {
        clearDraft() // 서버 저장 성공 시 로컬 삭제
        return true
      }
      return false
    } catch (err) {
      console.error('로컬 글 서버 연동 실패:', err)
      return false
    }
  }, [loadDraft, clearDraft])

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasDraft,
    syncDraftToServer,
  }
}
