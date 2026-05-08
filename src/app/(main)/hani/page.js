// src/app/(main)/hani/page.js
import { Hani } from '@/components/hani/Hani'
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata = { title: '한이 꾸미기' }

export default function HaniPage() {
  return (
    <PageLayout>
      <section className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
        <Hani pose="cheering" face="happy" size={160} animate="bounce" />
        <h1 className="mt-8 font-title text-2xl font-bold text-ink">한이 꾸미기</h1>
        <p className="mt-3 font-body text-sm leading-7 text-[#6B6560]">포인트로 모은 아이템을 한이에게 입혀보세요.</p>
      </section>
    </PageLayout>
  )
}
