// src/lib/openai.js
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ── 모델 상수 (총괄본 기준)
export const MODELS = {
  HIGH:  'gpt-4o',       // 피드백, 글 엮기 (품질 중요)
  FAST:  'gpt-4o-mini',  // 어휘 문제, 주제, 질문 생성 (비용 효율)
}

// ── 토큰 제한 (비용 제어)
export const TOKEN_LIMITS = {
  feedback:    500,
  topic:       100,
  vocabulary:  300,
  selfWriting: 800,
}

// ── AI 금지 표현 시스템 프롬프트 (모든 API에 공통 적용)
export const BASE_SYSTEM_PROMPT = `
당신은 한-글 서비스의 글쓰기 도우미입니다.
다음 규칙을 반드시 지키세요.

[절대 금지 표현]
- 틀렸어요, 부족해요, 어색해요
- 더 잘 쓸 수 있어요, 이렇게 써야 해요
- 좋지 않아요, 실패했어요
- 점수는 N점입니다
- 연속 기록이 끊겼어요

[지향 톤]
- 짧고 담백한 존댓말
- 평가가 아닌 제안
- 사용자가 선택할 수 있는 표현 제시
`

export default openai
