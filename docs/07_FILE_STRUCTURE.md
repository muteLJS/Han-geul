# 파일 구조 현황

## 루트
| 경로 | 역할 |
|---|---|
| `src/app/` | Next.js App Router 라우트, 레이아웃, API |
| `src/components/` | 재사용 UI와 도메인 컴포넌트 |
| `src/hooks/` | 클라이언트 훅 |
| `src/lib/` | 외부 서비스/서버 유틸 |
| `src/models/` | MongoDB/Mongoose 모델 |
| `src/styles/` | 디자인 토큰 |
| `src/utils/` | 공통 유틸/상수 |
| `docs/` | 제품·디자인·구현 기준 문서 |
| `public/` | 정적 파일 |

## 라우트 그룹
| 경로 | 역할 |
|---|---|
| `src/app/(auth)/` | 로그인, 회원가입, 인증 보조 화면 |
| `src/app/(onboarding)/` | 스플래시, 인트로, 온보딩 진단 |
| `src/app/(main)/` | 홈 이후 주요 서비스 화면 |
| `src/app/api/` | API 라우트 |

## 공통 배경 적용 지점
- `src/app/globals.css`: `hanji-bg` 정의
- `src/components/layout/PageLayout.js`: 메인 화면 모바일 셸
- `src/app/(auth)/layout.js`: 인증 화면 모바일 셸
- `src/app/(onboarding)/layout.js`: 진입/온보딩 화면 모바일 셸

## 정리 원칙
- 새 화면은 먼저 적절한 라우트 그룹에 추가한다.
- 화면 최상위에는 임의 배경색을 넣지 말고 공통 레이아웃의 `hanji-bg`를 사용한다.
- 빈 `page.js`는 빌드 에러를 만들므로 생성하지 않는다.
- 컴포넌트 파일명과 import 대소문자는 일치시킨다.
