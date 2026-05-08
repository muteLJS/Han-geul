// src/hooks/useSubscription.js
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

/**
 * 구독 상태 확인 훅
 * - isSubscribed: 구독 중 여부
 * - canUseFeedback: AI 피드백 사용 가능 여부 (무료 3회 / 구독 무제한)
 * - feedbackUsedToday: 오늘 사용한 피드백 횟수
 */
export function useSubscription() {
  const { data: session, status } = useSession()

  const [isSubscribed,      setIsSubscribed]      = useState(false)
  const [feedbackUsedToday, setFeedbackUsedToday] = useState(0)
  const [requestPending,    setRequestPending]    = useState(false)

  useEffect(() => {
    if (status === 'loading' || !session?.user?.id) return undefined

    let isCurrent = true
    const pendingTimer = window.setTimeout(() => {
      if (isCurrent) setRequestPending(true)
    }, 0)

    async function fetchStatus() {
      try {
        const res  = await fetch('/api/users/subscription-status')
        const data = await res.json()

        if (!isCurrent) return
        setIsSubscribed(data.isSubscribed ?? false)
        setFeedbackUsedToday(data.feedbackUsedToday ?? 0)
      } catch (err) {
        console.error('구독 상태 확인 실패:', err)
      } finally {
        if (isCurrent) setRequestPending(false)
      }
    }

    fetchStatus()

    return () => {
      isCurrent = false
      window.clearTimeout(pendingTimer)
    }
  }, [session?.user?.id, status])

  const MAX_FREE = 3

  const canUseFeedback = isSubscribed
    ? true
    : feedbackUsedToday < MAX_FREE

  const feedbackRemaining = isSubscribed
    ? null
    : MAX_FREE - feedbackUsedToday

  return {
    isSubscribed,
    canUseFeedback,
    feedbackUsedToday,
    feedbackRemaining,
    loading: status === 'loading' || requestPending,
  }
}
