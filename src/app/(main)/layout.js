// src/app/(main)/layout.js
import { BottomTabBar } from '@/components/layout/BottomTabBar'

export default function MainLayout({ children }) {
  return (
    <>
      {children}
      <BottomTabBar />
    </>
  )
}
