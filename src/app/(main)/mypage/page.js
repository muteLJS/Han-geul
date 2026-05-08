// src/app/(main)/mypage/page.js
'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const POINTS = 1240
const items = [
  { id: 'line-paper', name: '줄노트', category: '배경지', price: 50, desc: '에디터에서 글을 쓸 때 줄이 그어진 배경지를 사용할 수 있어요.' },
  { id: 'grid-paper', name: '모눈', category: '배경지', price: 50 },
  { id: 'flower-paper', name: '꽃', category: '배경지', price: 100 },
  { id: 'hand-font', name: '손글씨', category: '폰트', price: 50 },
  { id: 'hanna-font', name: '한나', category: '폰트', price: 80 },
  { id: 'jeju-font', name: '제주', category: '폰트', price: 60 },
  { id: 'dopo', name: '도포', category: '한이 의상', price: 100, owned: true },
  { id: 'scroll', name: '두루마기', category: '한이 의상', price: 80 },
  { id: 'modern', name: '현대복', category: '한이 의상', price: 60 },
]

function TopBar({ title, onBack }) {
  return (
    <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
      <div className="flex h-7 items-center justify-between">
        <button type="button" onClick={onBack} className="w-16 text-left font-body text-sm text-ink">← 뒤로</button>
        <h1 className="flex-1 text-center font-title text-base font-bold text-ink">{title}</h1>
        <span className="w-16" />
      </div>
    </header>
  )
}

function PointHistory({ go }) {
  const [filter, setFilter] = useState('전체▼')
  const rows = [
    ['글쓰기 완료', '오후 8:57', '+10pt', 'gain'],
    ['200자 달성', '오후 8:59', '+7pt', 'gain'],
    ['배경지 구매', '줄노트', '-50pt', 'use'],
  ].filter((row) => filter === '전체▼' || (filter === '획득' ? row[3] === 'gain' : row[3] === 'use'))
  return (
    <section className="min-h-dvh pb-6">
      <TopBar title="포인트 내역" onBack={() => go('home')} />
      <main className="pt-7">
        <section className="rounded-[20px] bg-[#EEF2FA] p-6 text-center">
          <p className="font-title text-4xl font-bold text-[#003478]">1,240 pt</p>
          <p className="mt-2 font-body text-sm text-ink/55">보유 포인트</p>
        </section>
        <div className="mt-6 flex gap-2">
          {['전체▼', '획득', '사용'].map((chip) => <button key={chip} onClick={() => setFilter(chip)} className={cn('rounded-full px-4 py-2 font-body text-xs', filter === chip ? 'bg-[#003478] text-white' : 'bg-[#F5F0E8] text-[#6B6560]')}>{chip}</button>)}
        </div>
        <h2 className="mt-7 font-title text-base font-bold text-ink">2026년 5월 7일</h2>
        <div className="mt-3 space-y-3">
          {rows.map(([title, sub, point, type]) => (
            <article key={title} className="rounded-[12px] bg-white p-4">
              <p className="font-body text-sm font-bold text-ink">{title}<span className={cn('float-right font-bold', type === 'gain' ? 'text-[#003478]' : 'text-[#CD2E3A]')}>{point}</span></p>
              <p className="mt-2 font-body text-xs text-[#9E9590]">{sub}</p>
            </article>
          ))}
        </div>
        <h2 className="mt-8 font-title text-base font-bold text-ink">2026년 5월 6일</h2>
      </main>
    </section>
  )
}

function ShopHome({ go }) {
  const [tab, setTab] = useState('전체')
  const categories = ['전체', '배경지', '폰트', '한이']
  const groups = [
    ['배경지', items.filter((item) => item.category === '배경지')],
    ['폰트', items.filter((item) => item.category === '폰트')],
    ['한이 의상', items.filter((item) => item.category === '한이 의상')],
  ].filter(([title]) => tab === '전체' || title.includes(tab))
  return (
    <section className="min-h-dvh pb-6">
      <TopBar title="상점" onBack={() => go('home')} />
      <main className="pt-5">
        <section className="sticky top-[60px] z-20 rounded-[14px] border border-[#E8E2D9] bg-white p-4 font-body text-sm font-bold text-ink">보유 포인트 <span className="float-right text-[#003478]">1,240 pt</span></section>
        <div className="mt-5 flex gap-5 border-b border-[#E8E2D9]">
          {categories.map((category) => <button key={category} onClick={() => setTab(category)} className={cn('pb-2 font-body text-sm font-bold', tab === category ? 'border-b-2 border-[#003478] text-[#003478]' : 'text-[#9E9590]')}>{category}</button>)}
        </div>
        <div className="mt-6 space-y-8">
          {groups.map(([title, groupItems]) => (
            <section key={title}>
              <h2 className="mb-3 font-title text-base font-bold text-ink">{title}</h2>
              <div className="grid grid-cols-3 gap-3">
                {groupItems.map((item) => <button key={item.id} onClick={() => go('detail', item.id)} className="relative h-[100px] rounded-[12px] border-[1.5px] border-[#E8E2D9] bg-white p-3 text-center"><p className="font-body text-sm font-bold text-ink">{item.name}</p><p className="mt-5 font-body text-[13px] font-bold text-[#003478]">{item.price}pt</p>{item.owned && <span className="absolute right-2 top-2 rounded-full bg-[#4CAF50] px-2 py-0.5 text-[10px] text-white">보유</span>}</button>)}
              </div>
            </section>
          ))}
        </div>
      </main>
    </section>
  )
}

function ItemDetail({ itemId, go, openConfirm }) {
  const item = items.find((target) => target.id === itemId) ?? items[0]
  const shortage = POINTS < item.price
  return (
    <section className="min-h-dvh pb-6">
      <TopBar title="" onBack={() => go('shop')} />
      <main className="pt-7">
        <section className="rounded-[20px] border border-[#E8E2D9] bg-white p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]"><div className="rounded-[14px] bg-[#F5F0E8] py-12 font-body text-sm text-ink/50">[아이템 미리보기]<br />({item.name} 예시)</div></section>
        <h1 className="mt-7 font-title text-xl font-bold text-ink">{item.name} {item.category === '배경지' ? '배경지' : ''}</h1>
        <p className="mt-2 font-body text-sm text-[#9E9590]">{item.category}</p>
        <p className="mt-6 font-body text-sm leading-[1.8] text-ink/70">{item.desc ?? `${item.name} 아이템을 사용할 수 있어요.`}</p>
        <section className="mt-6 rounded-[16px] border border-[#E8E2D9] bg-white p-5"><p className="font-title text-xl font-bold text-[#003478]">{item.price} pt</p><p className="mt-2 font-body text-sm text-ink/55">현재 보유 1,240 pt</p></section>
        <button type="button" disabled={shortage} onClick={() => openConfirm(item)} className="mt-6 h-14 w-full rounded-[16px] bg-[#003478] font-body text-base font-bold text-white disabled:bg-[#E8E2D9] disabled:text-[#9E9590]">{item.price}pt 구매하기</button>
        {shortage && <p className="mt-3 text-center font-body text-sm text-[#CD2E3A]">포인트가 부족해요</p>}
      </main>
    </section>
  )
}

function Modal({ children }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/35 px-6"><section className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)]">{children}</section></div> }

function BuyConfirm({ item, onCancel, onBuy }) {
  return <Modal><h2 className="font-title text-lg font-bold text-ink">{item.name} 배경지를<br />구매할까요?</h2><p className="mt-6 font-body text-sm text-ink/65">{item.price} pt 사용<br />구매 후 {(POINTS - item.price).toLocaleString()} pt 남음</p><div className="mt-7 grid grid-cols-2 gap-3"><button onClick={onCancel} className="h-12 rounded-[14px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">취소</button><button onClick={onBuy} className="h-12 rounded-[14px] bg-[#003478] font-body text-sm font-bold text-white">구매</button></div></Modal>
}

function BuyDone({ item, onApply, onLater }) {
  return <Modal><Hani pose="cheering" face="happy" size={90} animate="none" /><h2 className="mt-5 font-title text-xl font-bold text-ink">구매 완료!</h2><p className="mt-5 font-body text-sm leading-[1.7] text-ink/65">{item.name} 배경지를<br />사용할 수 있어요.</p><p className="mt-5 font-body text-sm font-bold text-ink">잔여 포인트 {(POINTS - item.price).toLocaleString()} pt</p><button onClick={onApply} className="mt-7 h-12 w-full rounded-[14px] bg-[#003478] font-body text-sm font-bold text-white">지금 적용하기</button><button onClick={onLater} className="mt-4 font-body text-sm text-ink/50">나중에 적용할게요</button></Modal>
}

function MyPageHome({ go }) {
  return (
    <section className="min-h-dvh pb-20">
      <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4"><h1 className="font-title text-xl font-bold text-ink">마이페이지</h1></header>
      <main className="pt-6 space-y-3">
        <button onClick={() => go('points')} className="w-full rounded-[16px] bg-white p-5 text-left font-body font-bold text-ink">포인트 내역 <span className="float-right text-[#003478]">1,240pt</span></button>
        <button onClick={() => go('shop')} className="w-full rounded-[16px] bg-white p-5 text-left font-body font-bold text-ink">상점 <span className="float-right text-ink/45">→</span></button>
        <button onClick={() => location.href = '/hani'} className="w-full rounded-[16px] bg-white p-5 text-left font-body font-bold text-ink">한이 꾸미기 <span className="float-right text-ink/45">→</span></button>
        <button onClick={() => location.href = '/settings'} className="w-full rounded-[16px] bg-white p-5 text-left font-body font-bold text-ink">설정 <span className="float-right text-ink/45">→</span></button>
      </main>
    </section>
  )
}

function MyPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [view, setView] = useState(searchParams.get('view') ?? 'home')
  const [itemId, setItemId] = useState(searchParams.get('item') ?? 'line-paper')
  const [confirmItem, setConfirmItem] = useState(null)
  const [doneItem, setDoneItem] = useState(null)
  const go = (next, nextItemId) => { setView(next); if (nextItemId) setItemId(nextItemId); router.replace(`/mypage${next === 'home' ? '' : `?view=${next}${nextItemId ? `&item=${nextItemId}` : ''}`}`, { scroll: false }) }
  return <PageLayout hasTopBar={false} className="px-4 pb-0">
    {view === 'home' && <MyPageHome go={go} />}
    {view === 'points' && <PointHistory go={go} />}
    {view === 'shop' && <ShopHome go={go} />}
    {view === 'detail' && <ItemDetail itemId={itemId} go={go} openConfirm={setConfirmItem} />}
    {confirmItem && <BuyConfirm item={confirmItem} onCancel={() => setConfirmItem(null)} onBuy={() => { setDoneItem(confirmItem); setConfirmItem(null) }} />}
    {doneItem && <BuyDone item={doneItem} onApply={() => setDoneItem(null)} onLater={() => setDoneItem(null)} />}
  </PageLayout>
}


export default function MyPage() {
  return (
    <Suspense fallback={null}>
      <MyPageInner />
    </Suspense>
  )
}
