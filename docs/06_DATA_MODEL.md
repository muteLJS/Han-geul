# MongoDB 데이터 모델

## 컬렉션 목록
| 컬렉션 | 역할 |
|---|---|
| users | 계정, 닉네임, 소셜 로그인, 구독 상태 |
| writingEntries | 사용자 글, 제목, 본문, 공개 범위 |
| books | 책 제목, 챕터, 완성 여부, 공개 범위 |
| chapters | 챕터 정보, 순서, 연결 글 |
| vocabProgress | 어휘 연습 단계, 정답률 |
| copyworkRecords | 필사 원문, 완료 기록 |
| aiFeedbacks | 피드백 요청 기록, 사용 횟수 |
| missions | 미션 달성 상태, 포인트 지급 |
| points | 포인트 적립/사용 내역 |
| mascotItems | 한이 꾸미기 아이템, 소유/장착 상태 |
| channels | 작가 채널 프로필, 팔로우 정보 |
| reactions | 붓 하트, 붓 밑줄 |
| subscriptions | 구독 상태, 결제 내역 |
| reports | 성장 리포트 집계 데이터 |

## users 주요 필드
_id, nickname, email, provider, role,
subscriptionStatus, points, naraeItems(→ haniItems),
createdAt

 

## writingEntries 주요 필드
_id, authorId, title, body, wordCount,
visibility(public|link|private), bookId, chapterId,
isDraft, createdAt, updatedAt

 

## books 주요 필드
_id, authorId, title, intro, coverColor,
visibility(public|link|private),
status(writing|completed), shelfCategory,
wordCount, completedAt, createdAt

 

## subscriptions 주요 필드
_id, userId, plan(monthly|yearly),
status(active|cancelled|expired),
paymentKey, expiresAt, createdAt

 

## 책 두께 기준 (MVP 3단계)
- 얇음: wordCount < 500
- 보통: 500 ≤ wordCount < 2000
- 두꺼움: wordCount ≥ 2000