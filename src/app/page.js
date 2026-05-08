// src/app/page.js
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { BottomTabBar } from '@/components/layout/BottomTabBar'
import HomePage from './(main)/page'

export default async function RootPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/splash')
  }

  return (
    <>
      <HomePage />
      <BottomTabBar />
    </>
  )
}
