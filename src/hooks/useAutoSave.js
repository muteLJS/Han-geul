// src/hooks/useAutoSave.js
import { useEffect, useRef, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useLocalDraft } from './useLocalDraft'

/**
 * 30초마다 자동 저장
 * - 비회원: localStorage에 임시 저장
 * - 회원: 서버 API 호출
 */
export function useAutoSave({ title, content, entryId = null }) {
  const { data: session } = useSession()
  const { saveDraft } = useLocalDraft()

  const [saveStatus, setSaveStatus] = useState('idle')
  // idle | saving | saved | error

  const timerRef    = useRef(null)
  const contentRef  = useRef(content)
  const titleRef    = useRef(title)

  // 최신값을 ref에 동기화 (클로저 문제 방지)
  useEffect(() => { contentRef.current = content }, [content])
  useEffect(() => { titleRef.current   = title   }, [title])

  const save = useCallback(async () => {
    const currentContent = contentRef.current
    const currentTitle   = titleRef.current

    if (!currentContent?.trim()) return

    setSaveStatus('saving')

    try {
      if (!session) {
        // 비회원: localStorage 저장
        saveDraft({ title: currentTitle, content: currentContent })
      } else {
        // 회원: 서버 저장
        await fetch('/api/posts', {
          method:  entryId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id:      entryId,
            title:   currentTitle,
            body:    currentContent,
            isDraft: true,
          }),
        })
      }
      setSaveStatus('saved')
    } catch (err) {
      console.error('자동 저장 실패:', err)
      setSaveStatus('error')
    } finally {
      // 2초 후 상태 초기화
      setTimeout(() => setSaveStatus('idle'), 2000)
    }
  }, [session, entryId, saveDraft])

  // 30초 인터벌 등록
  useEffect(() => {
    if (!content?.trim()) return

    timerRef.current = setInterval(save, 30000)
    return () => clearInterval(timerRef.current)
  }, [save, content])

  // 수동 저장 트리거도 반환
  return { saveStatus, saveNow: save }
}
