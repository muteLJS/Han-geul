// src/components/hani/HaniSVG.js

export function HaniSVG({
  size         = 90,
  face         = 'default',
  pose         = 'default',
  bodyColor    = '#FAFAF8',
  outlineColor = '#1A1A2E',
  dotColor     = '#CD2E3A',
  className    = '',
}) {
  const w = size * (64 / 90)
  const h = size

  // ── 표정 ───────────────────────────────────────────────
  const faces = {

    // 기본: 동그란 눈 + 작은 미소
    default: (
      <g>
        <ellipse cx="26" cy="53" rx="2.8" ry="3.2" fill={outlineColor} />
        <ellipse cx="38" cy="53" rx="2.8" ry="3.2" fill={outlineColor} />
        {/* 눈 하이라이트 */}
        <ellipse cx="25" cy="51.5" rx="1" ry="1" fill="white" opacity="0.9" />
        <ellipse cx="37" cy="51.5" rx="1" ry="1" fill="white" opacity="0.9" />
        {/* 입 */}
        <path d="M28 59.5 Q32 63.5 36 59.5" stroke={outlineColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="20" cy="58" rx="4.5" ry="2.8" fill="#F4BFBF" opacity="0.55" />
        <ellipse cx="44" cy="58" rx="4.5" ry="2.8" fill="#F4BFBF" opacity="0.55" />
      </g>
    ),

    // 기쁨: 반달 눈 + 큰 웃음
    happy: (
      <g>
        <path d="M22.5 54 Q26 49 29.5 54" stroke={outlineColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M34.5 54 Q38 49 41.5 54" stroke={outlineColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* 입 */}
        <path d="M25 59 Q32 66 39 59" stroke={outlineColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 (진하게) */}
        <ellipse cx="19" cy="57" rx="5" ry="3.2" fill="#F4BFBF" opacity="0.75" />
        <ellipse cx="45" cy="57" rx="5" ry="3.2" fill="#F4BFBF" opacity="0.75" />
      </g>
    ),

    // 생각 중: 한쪽 눈 찡긋 + 삐죽 입
    thinking: (
      <g>
        {/* 왼쪽 눈 정상 */}
        <ellipse cx="26" cy="53" rx="2.8" ry="3.2" fill={outlineColor} />
        <ellipse cx="25" cy="51.5" rx="1" ry="1" fill="white" opacity="0.9" />
        {/* 오른쪽 눈 찡긋 */}
        <path d="M35 51.5 Q38 54 41 51.5" stroke={outlineColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* 입 (한쪽으로 삐죽) */}
        <path d="M27 60 Q31 58 36 61" stroke={outlineColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="20" cy="58" rx="4" ry="2.5" fill="#F4BFBF" opacity="0.45" />
        <ellipse cx="44" cy="58" rx="4" ry="2.5" fill="#F4BFBF" opacity="0.45" />
        {/* 물음표 */}
        <text x="47" y="44" fontSize="9" fill={outlineColor} opacity="0.55" fontFamily="serif">?</text>
      </g>
    ),

    // 위로: 부드럽게 감긴 눈 + 따뜻한 미소
    comfort: (
      <g>
        <path d="M22.5 53.5 Q26 57 29.5 53.5" stroke={outlineColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M34.5 53.5 Q38 57 41.5 53.5" stroke={outlineColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* 입 */}
        <path d="M27 59.5 Q32 63.5 37 59.5" stroke={outlineColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 볼터치 (가장 진하게) */}
        <ellipse cx="19" cy="57" rx="5.5" ry="3.5" fill="#F4BFBF" opacity="0.85" />
        <ellipse cx="45" cy="57" rx="5.5" ry="3.5" fill="#F4BFBF" opacity="0.85" />
      </g>
    ),



    // 슬픔: 미안한 눈 + 작은 눈물
    sad: (
      <g>
        <path d="M22.5 54 Q26 51 29.5 54" stroke={outlineColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M34.5 54 Q38 51 41.5 54" stroke={outlineColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M28 62 Q32 59 36 62" stroke={outlineColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M44 57 C46 60 47 62 44 64 C41 62 42 60 44 57Z" fill="#88A9C3" opacity="0.8" />
        <ellipse cx="19" cy="58" rx="4.5" ry="2.8" fill="#F4BFBF" opacity="0.65" />
        <ellipse cx="45" cy="58" rx="4.5" ry="2.8" fill="#F4BFBF" opacity="0.65" />
      </g>
    ),

    // 놀람: 크게 뜬 눈 + 동그란 입
    surprised: (
      <g>
        <ellipse cx="26" cy="52" rx="4" ry="4.5" fill={outlineColor} />
        <ellipse cx="38" cy="52" rx="4" ry="4.5" fill={outlineColor} />
        {/* 눈 하이라이트 */}
        <ellipse cx="24.5" cy="50" rx="1.5" ry="1.5" fill="white" opacity="0.9" />
        <ellipse cx="36.5" cy="50" rx="1.5" ry="1.5" fill="white" opacity="0.9" />
        {/* 입 (동그랗게 벌림) */}
        <ellipse cx="32" cy="62" rx="3.5" ry="3.2" fill={outlineColor} />
        <ellipse cx="32" cy="62" rx="2" ry="1.8" fill={bodyColor} />
      </g>
    ),

    // 졸림: 반쯤 감긴 눈 + 작은 입 + ZZ
    sleepy: (
      <g>
        {/* 눈꺼풀 (아래 반) */}
        <path d="M22.5 52 Q26 56 29.5 52" stroke={outlineColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M34.5 52 Q38 56 41.5 52" stroke={outlineColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* 눈 위 선 */}
        <path d="M22.5 52 Q26 50 29.5 52" stroke={outlineColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M34.5 52 Q38 50 41.5 52" stroke={outlineColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* 입 */}
        <path d="M29 60.5 Q32 62.5 35 60.5" stroke={outlineColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="20" cy="58" rx="4" ry="2.5" fill="#F4BFBF" opacity="0.4" />
        <ellipse cx="44" cy="58" rx="4" ry="2.5" fill="#F4BFBF" opacity="0.4" />
        {/* ZZ */}
        <text x="44" y="43" fontSize="7" fill={outlineColor} opacity="0.45" fontFamily="serif">z</text>
        <text x="47" y="36" fontSize="9.5" fill={outlineColor} opacity="0.35" fontFamily="serif">Z</text>
      </g>
    ),
  }

  // ── 포즈별 팔 ──────────────────────────────────────────
  const poses = {

    // 기본: 양팔 자연스럽게 내림
    default: (
      <g>
        <ellipse cx="13" cy="67" rx="5.5" ry="7.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(8 13 67)" />
        <ellipse cx="51" cy="67" rx="5.5" ry="7.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(-8 51 67)" />
      </g>
    ),

    // 응원: 양팔 만세
    cheering: (
      <g>
        <ellipse cx="9" cy="52" rx="5" ry="8" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(-45 9 52)" />
        <ellipse cx="55" cy="52" rx="5" ry="8" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(45 55 52)" />
      </g>
    ),

    // 생각 중: 오른팔 들어 턱 괴기
    thinking: (
      <g>
        {/* 왼팔 내림 */}
        <ellipse cx="13" cy="67" rx="5.5" ry="7.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(8 13 67)" />
        {/* 오른팔 올림 */}
        <ellipse cx="53" cy="57" rx="5" ry="7.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(-35 53 57)" />
      </g>
    ),

    // 들고 있음: 오른팔 들어 붓 잡기
    holding: (
      <g>
        {/* 왼팔 내림 */}
        <ellipse cx="13" cy="67" rx="5.5" ry="7.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(8 13 67)" />
        {/* 오른팔 올림 */}
        <ellipse cx="54" cy="55" rx="5" ry="7.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(25 54 55)" />
        {/* 붓 자루 */}
        <line x1="56" y1="22" x2="60" y2="70" stroke="#7B5C3A" strokeWidth="2.2" strokeLinecap="round" />
        {/* 붓 금속 띠 */}
        <rect x="54.5" y="36" width="5" height="4" rx="1" fill="#B8A070" />
        {/* 붓 털 */}
        <ellipse cx="57" cy="24" rx="3.2" ry="7" fill={outlineColor} opacity="0.85" />
        <ellipse cx="57" cy="29" rx="2" ry="3" fill="#3A3A5C" opacity="0.5" />
      </g>
    ),

    // 쑥스러움: 양손 앞으로 모으기
    shy: (
      <g>
        <ellipse cx="22" cy="73" rx="5.5" ry="6.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(20 22 73)" />
        <ellipse cx="42" cy="73" rx="5.5" ry="6.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2"
          transform="rotate(-20 42 73)" />
      </g>
    ),
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 64 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── 그림자 ── */}
      <ellipse cx="32" cy="87" rx="16" ry="2.5" fill={outlineColor} opacity="0.07" />

      {/* ── 다리 ── */}
      <ellipse cx="24" cy="81" rx="5.5" ry="6.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2" />
      <ellipse cx="40" cy="81" rx="5.5" ry="6.5" fill={bodyColor} stroke={outlineColor} strokeWidth="2" />

      {/* ── 포즈 (팔) — 몸통 뒤 ── */}
      {poses[pose] ?? poses.default}

      {/* ── 몸통 ── */}
      <path
        d="M32 5
           C32 5 14 22 10 40
           C7 53 10 62 16 68
           C20 72 25.5 75 32 75
           C38.5 75 44 72 48 68
           C54 62 57 53 54 40
           C50 22 32 5 32 5 Z"
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* ── 몸통 하이라이트 ── */}
      <path
        d="M26 14 C22 22 18 32 18 40"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* ── 머리 빨간 점 ── */}
      <circle cx="32" cy="6.5" r="4.2" fill={dotColor} />
      {/* 점 하이라이트 */}
      <circle cx="30.5" cy="5" r="1.3" fill="white" opacity="0.5" />

      {/* ── 표정 ── */}
      {faces[face] ?? faces.default}
    </svg>
  )
}
