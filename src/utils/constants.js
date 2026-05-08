// src/utils/constants.js

// AI 피드백 무료 횟수 제한
export const MAX_FREE_FEEDBACK_PER_DAY = 3

// 자동 저장 간격 (ms)
export const AUTO_SAVE_INTERVAL = 30000

// 구독 가격
export const SUBSCRIPTION = {
  monthly:  4900,
  yearly:   39900,
  trial:    7,       // 무료 체험 일수
}

// 공개 범위 옵션
export const VISIBILITY = {
  PUBLIC:  'public',
  LINK:    'link',
  PRIVATE: 'private',
}

export const VISIBILITY_LABELS = {
  public:  '전체 공개',
  link:    '링크 공개',
  private: '비공개',
}

// 책 상태
export const BOOK_STATUS = {
  WRITING:   'writing',
  COMPLETED: 'completed',
}

// 탐색 정렬 옵션 (인기순 금지 — 총괄본 명시)
export const SORT_OPTIONS = [
  { value: 'random', label: '랜덤'   },
  { value: 'recent', label: '최신순' },
  { value: 'viewed', label: '조회순' },
  // ❌ 'popular' / '인기순' 절대 사용 금지
]

// 하단 탭바 (알림 아이콘 없음 — 총괄본 명시)
export const BOTTOM_TABS = [
  { href: '/',           label: '홈',   icon: 'home'     },
  { href: '/write',      label: '쓰기', icon: 'write'    },
  { href: '/vocabulary', label: '연습', icon: 'practice' },
  { href: '/library',    label: '기록', icon: 'library'  },
]

// AI 금지 표현 (프롬프트 작성 시 참고)
export const AI_FORBIDDEN_PHRASES = [
  '틀렸어요',
  '부족해요',
  '어색해요',
  '더 잘 쓸 수 있어요',
  '이렇게 써야 해요',
  '좋지 않아요',
  '실패했어요',
  '점수는',
  '연속 기록이 끊겼어요',
]
