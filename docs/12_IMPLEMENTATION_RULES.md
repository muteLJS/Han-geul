# 한-글 구현 규칙

## 핵심 원칙

현재 프로젝트는:
- 모바일 웹 앱
- 감성 기반 UI
- 아트디렉션 중심 프로젝트

다.

기능보다:
- layout
- spacing
- hierarchy
- visual balance

를 우선한다.

---

## 구현 방식

항상:
- 컴포넌트 단위로 작업한다
- 부분 수정 중심으로 진행한다
- 전체 페이지 재구성 금지

---

## 절대 금지

- 기존 layout 임의 변경
- spacing 임의 수정
- hierarchy 변경
- 새로운 UI 추가
- 새로운 스타일 추가
- desktop 우선 구현
- 임의 다크모드 추가
- 임의 애니메이션 추가

---

## Figma 기준

현재 Figma를 기준으로:
- proportions
- spacing
- alignment
- component structure

를 최대한 동일하게 구현한다.

디자인 reinterpret 금지.

---

## 구현 우선순위

1. layout
2. spacing
3. typography
4. texture
5. interaction
6. 기능 연결

---

## 모바일 웹 규칙

- max-w-lg 모바일 앱 셸 유지
- desktop 전용 구조 먼저 만들지 않는다
- 모바일 기준으로 모든 UI 구성
- 데스크탑은 모바일 앱을 중앙 정렬한 형태

---

## 수정 규칙

수정 시:
- 수정 대상 컴포넌트만 변경
- 다른 섹션 건드리지 않음
- 기존 디자인 시스템 유지

---

## 디자인 유지 규칙

반드시 유지:
- 한지 배경
- 먹색 기반 텍스트
- 절제된 오방색
- 한이 스타일
- spacing rhythm
- 조용한 분위기

---

## 개발 우선순위

1. 화면 분위기 유지
2. 디자인 구조 유지
3. 모바일 사용성
4. 인터랙션
5. 기능 연결