// src/app/page.js
import { BottomTabBar } from '@/components/layout/BottomTabBar'
import HomePage from './(main)/page'

// 디자인 확인 모드: 로그인 여부와 관계없이 홈 화면을 바로 노출한다.
export default function RootPage() {
  return (
    <>
      <HomePage />
      <BottomTabBar />
    </>
  )
}
