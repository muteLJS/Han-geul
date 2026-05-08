// src/styles/tokens.js

export const colors = {
  hanji:        '#FAF6EE',
  hanjiLight:   '#F5F0E8',
  ink:          '#1A1714',
  haniOutline:  '#1A1A2E',

  obang: {
    blue:   '#4A7C8E',
    white:  '#F5F0E8',
    red:    '#C4614A',
    black:  '#3A3530',
    yellow: '#D4A853',
  },

  taeguk: {
    blue: '#003478',
    red:  '#CD2E3A',
  },
}

export const fonts = {
  title: "'Noto Serif KR', serif",
  body:  "'Noto Sans KR', sans-serif",
  hani:  "'Nanum Pen Script', cursive",
}

export const breakpoints = {
  mobile:  '768px',
  tablet:  '1024px',
}

export const maxWidth = {
  write: '700px',
  content: '1200px',
}

// 오방색 버튼 데이터 (홈에서 바로 import해서 씀)
export const obangButtons = [
  {
    key:       'write',
    href:      '/write',
    label:     '자유\n글쓰기',
    bg:        '#4A7C8E',
    text:      '#FAF6EE',
    border:    false,
  },
  {
    key:       'vocabulary',
    href:      '/vocabulary',
    label:     '어휘\n연습',
    bg:        '#F5F0E8',
    text:      '#3A3530',
    border:    true,
  },
  {
    key:       'copying',
    href:      '/copying',
    label:     '필사',
    bg:        '#C4614A',
    text:      '#FAF6EE',
    border:    false,
  },
  {
    key:       'self-writing',
    href:      '/self-writing',
    label:     '나를\n담은 글',
    bg:        '#3A3530',
    text:      '#FAF6EE',
    border:    false,
  },
  {
    key:       'book-write',
    href:      '/book-write',
    label:     '나의\n책 쓰기',
    bg:        '#D4A853',
    text:      '#FAF6EE',
    border:    false,
  },
]

// 책 두께 기준 (도서함에서 import해서 씀)
export const bookThickness = [
  { maxWords: 499,  level: 1, label: '얇음',   widthPx: 24  },
  { maxWords: 1999, level: 2, label: '보통',   widthPx: 40  },
  { maxWords: Infinity, level: 3, label: '두꺼움', widthPx: 56 },
]

// 포인트 적립 기준 (미션 섹션에서 import해서 씀)
export const pointRules = {
  write100:    5,
  write500:    10,
  write1000:   20,
  write1000p:  30,
  vocabulary:  5,
  copying:     5,
  streak7:     50,
  firstBook:   100,
}
