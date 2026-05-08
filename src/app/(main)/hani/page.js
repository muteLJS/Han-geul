// src/app/(main)/hani/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hani } from '@/components/hani/Hani'
import { PageLayout } from '@/components/layout/PageLayout'
import { cn } from '@/utils/cn'

const tabs = ['의상', '색상', '표정']
const items = [
  { name: '흰한복', status: '기본', owned: true },
  { name: '도포', status: '●착용', owned: true, active: true },
  { name: '두루마기', status: '🔒', price: '80pt' },
  { name: '현대복', status: '🔒' },
  { name: '학생복', status: '🔒' },
  { name: '🔒', status: '' },
]

export default function HaniPage() {
  const router = useRouter()
  const [tab, setTab] = useState('의상')
  const [selected, setSelected] = useState('도포')
  return (
    <PageLayout hasTopBar={false} hasBottomTab={false} className="px-4 pb-6">
      <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
        <div className="flex h-7 items-center justify-between"><button onClick={() => router.back()} className="w-16 text-left font-body text-sm text-ink">← 뒤로</button><h1 className="flex-1 text-center font-title text-base font-bold text-ink">한이 꾸미기</h1><span className="w-16" /></div>
      </header>
      <main className="pt-7">
        <section className="rounded-[20px] bg-[#F5F0E8] p-6 text-center">
          <Hani pose="cheering" face="happy" size={180} animate="none" />
          <p className="mt-3 font-body text-sm font-bold text-ink/60">{selected} 착용 중</p>
        </section>
        <div className="mt-6 flex gap-5 border-b border-[#E8E2D9]">
          {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={cn('pb-2 font-body text-sm font-bold', tab === item ? 'border-b-2 border-[#003478] text-[#003478]' : 'text-[#9E9590]')}>{item}</button>)}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {items.map((item) => (
            <button key={item.name} onClick={() => item.owned && setSelected(item.name)} className={cn('h-[100px] rounded-[12px] border-[1.5px] bg-white p-3 text-center font-body text-sm', item.active || selected === item.name ? 'border-2 border-[#003478]' : 'border-[#E8E2D9]', !item.owned && 'opacity-55')}>
              <p className="font-bold text-ink">{item.name}</p>
              <p className={cn('mt-5 text-xs', item.active || selected === item.name ? 'text-[#003478]' : 'text-ink/50')}>{item.status}</p>
              {item.price && <p className="mt-1 text-xs text-[#003478]">{item.price}</p>}
            </button>
          ))}
        </div>
        <button className="mt-8 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white">적용하기</button>
      </main>
    </PageLayout>
  )
}
