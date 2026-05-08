// src/app/(main)/library/page.js
'use client'

import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const sampleEntry = {
  title: '오늘 있었던 일',
  type: '일기',
  count: 87,
  date: '2026년 5월 7일 목요일',
  shortDate: '5월 7일 목',
  body: '오늘은 오랜만에 친구를 만났다. 카페에서 두 시간 넘게 이야기를 나눴는데 정말 오랜만에 웃었다.',
  feedback: "'기뻤다' 대신 감각으로 표현해보면 어떨까요?",
}

const entries = [
  sampleEntry,
  { title: '봄비 내리는 날', type: '수필', count: 234, shortDate: '5월 6일 수', body: '창밖으로 빗소리가 천천히 이어졌다. 마음도 그 속도에 맞춰 느려졌다.' },
  { title: '4월의 마지막 기록', type: '일기', count: 156, shortDate: '4월 30일 목', body: '한 달의 끝에서 남은 문장들을 가만히 돌아보았다.' },
]

const emotions = [
  ['😊', '홀가분함'], ['😌', '평온함'], ['🤔', '생각 많음'], ['😢', '슬픔'],
  ['😤', '답답함'], ['😄', '기쁨'], ['😰', '불안'], ['💪', '뿌듯함'],
]

function TopBar({ title, onBack, right }) {
  return (
    <header className="sticky top-0 z-30 -mx-4 hanji-bg border-b border-[#E8E2D9] px-4 py-4">
      <div className="flex h-7 items-center justify-between">
        {onBack ? <button type="button" onClick={onBack} className="w-16 text-left font-body text-sm text-ink">← 뒤로</button> : <h1 className="font-title text-xl font-bold text-ink">{title}</h1>}
        {onBack && <h1 className="flex-1 text-center font-title text-base font-bold text-ink">{title}</h1>}
        <div className="w-16 text-right font-body text-sm text-ink">{right}</div>
      </div>
    </header>
  )
}

function Card({ children, className }) {
  return <section className={cn('rounded-[16px] border border-[#E8E2D9] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]', className)}>{children}</section>
}

function MonthCalendar({ selectedDay, onSelect }) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1)
  const written = new Set([7, 12, 18, 23])
  return (
    <Card className="rounded-[20px]">
      <div className="mb-5 flex items-center justify-between font-title text-base font-bold text-ink"><span>2026년 5월</span><span className="font-body text-sm text-ink/45">&lt; &gt;</span></div>
      <div className="grid grid-cols-7 gap-y-3 text-center font-body text-xs text-ink/50">
        {['일','월','화','수','목','금','토'].map((day) => <span key={day}>{day}</span>)}
        {Array.from({ length: 5 }).map((_, i) => <span key={`blank-${i}`} />)}
        {days.map((day) => {
          const today = day === 7
          const selected = selectedDay === day && !today
          const future = day > 8
          return (
            <button key={day} type="button" onClick={() => onSelect(day)} className="relative mx-auto flex h-8 w-8 items-center justify-center">
              <span className={cn('flex h-7 w-7 items-center justify-center rounded-full', today && 'bg-[#003478] text-white', selected && 'bg-[#EEF2FA] text-[#003478]', future && 'text-[#C8C4BD]')}>{day}</span>
              {written.has(day) && !today && <span className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-[#003478]" />}
            </button>
          )
        })}
      </div>
    </Card>
  )
}

function SummaryCards() {
  return (
    <section className="mt-7">
      <h2 className="mb-3 font-title text-base font-bold text-ink">이번 달 요약</h2>
      <div className="grid grid-cols-3 gap-3">
        {[[ '작성일', '12일' ], [ '총 글자', '4,230자' ], [ '스트릭', '12일' ]].map(([label, value]) => (
          <div key={label} className="rounded-[12px] border border-[#E8E2D9] bg-white p-[14px] text-center">
            <p className="font-title text-[22px] font-bold text-[#003478]">{value}</p><p className="mt-1 font-body text-xs text-[#9E9590]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function EntryCard({ onOpen }) {
  return (
    <button type="button" onClick={onOpen} className="w-full rounded-[16px] border border-[#E8E2D9] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
      <h3 className="font-body text-[15px] font-bold text-[#1A1A2E]">오늘 있었던 일</h3>
      <p className="mt-2 line-clamp-2 font-body text-[13px] leading-[1.7] text-[#6B6560]">오늘은 오랜만에 친구를 만났다. 카페에서...</p>
      <p className="mt-3 font-body text-xs text-[#9E9590]">87자 · 일기 <span className="float-right text-ink/45">→</span></p>
    </button>
  )
}

function EmptyDay({ onWrite }) {
  return (
    <Card className="text-center">
      <Hani pose="default" face="comfort" size={68} animate="none" />
      <p className="mt-3 whitespace-pre-line font-hani-bubble text-[18px] leading-[1.6] text-ink">{`이날은 글이 없어요.\n지금 써볼까요?`}</p>
      <button type="button" onClick={onWrite} className="mt-5 h-12 w-full rounded-[14px] bg-[#003478] font-body text-sm font-bold text-white">이날 글 쓰러 가기 →</button>
    </Card>
  )
}

function RecordHome({ selectedDay, setSelectedDay, go }) {
  return (
    <section className="min-h-dvh pb-20">
      <TopBar title="기록" />
      <main className="pt-5">
        <MonthCalendar selectedDay={selectedDay} onSelect={setSelectedDay} />
        <SummaryCards />
        <div className="mt-7 flex items-center justify-between">
          <h2 className="font-title text-base font-bold text-ink">5월 {selectedDay}일 {selectedDay === 7 ? '목요일' : '금요일'}</h2>
          <button type="button" onClick={() => go('list')} className="font-body text-xs text-ink/45">전체 글 &gt;</button>
        </div>
        <div className="mt-3">{selectedDay === 7 ? <EntryCard onOpen={() => go('detail')} /> : <EmptyDay onWrite={() => go('emotion')} />}</div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <button type="button" onClick={() => go('stats')} className="rounded-[12px] border border-[#E8E2D9] py-3 font-body text-xs text-ink/60">통계</button>
          <button type="button" onClick={() => go('book')} className="rounded-[12px] border border-[#E8E2D9] py-3 font-body text-xs text-ink/60">나의 책</button>
          <button type="button" onClick={() => go('badges')} className="rounded-[12px] border border-[#E8E2D9] py-3 font-body text-xs text-ink/60">뱃지</button>
          <button type="button" onClick={() => go('streak')} className="rounded-[12px] border border-[#E8E2D9] py-3 font-body text-xs text-ink/60">연속 작성</button>
          <button type="button" onClick={() => go('emotion-calendar')} className="rounded-[12px] border border-[#E8E2D9] py-3 font-body text-xs text-ink/60">감정 달력</button>
          <button type="button" onClick={() => go('empty')} className="rounded-[12px] border border-[#E8E2D9] py-3 font-body text-xs text-ink/60">빈 상태</button>
        </div>
      </main>
    </section>
  )
}

function Detail({ go, setDeleteOpen }) {
  return (
    <section className="min-h-dvh pb-6">
      <TopBar title="" onBack={() => go('home')} right={<button type="button" onClick={() => go('list')}>··· 더보기</button>} />
      <main className="pt-8">
        <p className="font-body text-[13px] leading-[1.7] text-[#9E9590]">2026년 5월 7일 목요일<br />일기 · 87자</p>
        <h1 className="mt-7 font-title text-[22px] font-bold text-ink">오늘 있었던 일</h1>
        <div className="my-4 border-t border-[#E8E2D9]" />
        <p className="font-title text-base leading-[1.8] text-ink">{sampleEntry.body}</p>
        <Card className="mt-10">
          <h2 className="font-title text-base font-bold text-ink">🖊 되짚음 기록</h2>
          <p className="mt-3 font-body text-sm leading-[1.7] text-ink/65">“{sampleEntry.feedback}”</p>
        </Card>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link href="/write" className="flex h-[52px] items-center justify-center rounded-[14px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/65">✏️ 이어 쓰기</Link>
          <button type="button" onClick={() => setDeleteOpen(true)} className="h-[52px] rounded-[14px] font-body text-sm font-bold text-[#CD2E3A]">🗑 삭제</button>
        </div>
      </main>
    </section>
  )
}

function DeleteModal({ onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/35 px-6">
      <section className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <Hani pose="shy" face="comfort" size={68} animate="none" />
        <h2 className="mt-5 font-title text-lg font-bold text-ink">이 글을 삭제할까요?</h2>
        <p className="mt-5 font-body text-sm leading-[1.7] text-ink/60">삭제한 글은 복구할 수<br />없어요.</p>
        <div className="mt-7 grid grid-cols-2 gap-3"><button onClick={onClose} className="h-12 rounded-[14px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">취소</button><button onClick={onDelete} className="h-12 rounded-[14px] bg-[#CD2E3A] font-body text-sm font-bold text-white">삭제</button></div>
      </section>
    </div>
  )
}

function highlight(text, query) {
  if (!query || !text.includes(query)) return text
  const [pre, ...rest] = text.split(query)
  return <>{pre}<span className="text-[#003478]">{query}</span>{rest.join(query)}</>
}

function List({ go }) {
  const [query, setQuery] = useState('')
  const filtered = entries.filter((entry) => !query || `${entry.title} ${entry.body}`.includes(query))
  return (
    <section className="min-h-dvh pb-6">
      <TopBar title="전체 글" onBack={() => go('home')} />
      <main className="pt-4">
        <div className="rounded-[12px] bg-[#F5F0E8] px-4"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="🔍 제목 또는 내용 검색" className="h-11 w-full bg-transparent font-body text-sm outline-none placeholder:text-ink/35" /></div>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">{['전체▼','일기','수필','에세이'].map((chip, i) => <span key={chip} className={cn('rounded-full px-4 py-2 font-body text-xs', i === 0 ? 'bg-[#003478] text-white' : 'bg-[#F5F0E8] text-[#6B6560]')}>{chip}</span>)}</div>
        {query && <p className="mt-4 font-body text-sm text-ink/55">{filtered.length > 0 ? `${filtered.length}건의 글에서 찾았어요` : ''}</p>}
        {query && filtered.length === 0 ? (
          <div className="pt-16 text-center"><Hani pose="default" face="comfort" size={68} animate="none" /><p className="mt-4 whitespace-pre-line font-hani-bubble text-[19px] leading-[1.6] text-ink">검색 결과가 없어요.\n다른 단어로 찾아볼까요?</p></div>
        ) : (
          <div className="mt-7"><h2 className="mb-4 font-title text-base font-bold text-ink">2026년 5월</h2>{filtered.slice(0,2).map((entry) => <button key={entry.title} onClick={() => go('detail')} className="mb-[10px] w-full rounded-[14px] bg-white p-4 text-left"><p className="font-body text-xs text-[#9E9590]">{entry.shortDate} · {entry.type} · {entry.count}자</p><h3 className="mt-2 font-body text-[15px] font-bold text-[#1A1A2E]">{highlight(entry.title, query)}</h3><p className="mt-2 line-clamp-2 font-body text-[13px] leading-[1.6] text-[#6B6560]">{highlight(entry.body, query)}</p></button>)}<h2 className="mb-4 mt-7 font-title text-base font-bold text-ink">2026년 4월</h2><button className="mb-[10px] w-full rounded-[14px] bg-white p-4 text-left"><p className="font-body text-xs text-[#9E9590]">4월 30일 목 · 일기 · 156자</p><h3 className="mt-2 font-body text-[15px] font-bold text-[#1A1A2E]">4월의 마지막 기록</h3><p className="mt-2 font-body text-[13px] text-[#6B6560]">한 달의 끝에서...</p></button></div>
        )}
      </main>
    </section>
  )
}

function Stats({ go }) {
  return (
    <section className="min-h-dvh pb-6"><TopBar title="나의 통계" onBack={() => go('home')} /><main className="pt-7 space-y-6">
      <Card className="grid grid-cols-2 gap-6 bg-[#EEF2FA]">{[['총 글 수','47편'],['총 글자수','18,420자'],['최장 스트릭','15일'],['평균 글자수','391자']].map(([l,v])=><div key={l}><p className="font-body text-xs text-ink/55">{l}</p><p className="mt-1 font-title text-2xl font-bold text-[#003478]">{v}</p></div>)}</Card>
      <section><h2 className="mb-3 font-title text-base font-bold text-ink">월별 작성 현황</h2><Card><div className="flex h-28 items-end justify-around">{[45,85,64,43,100].map((h,i)=><div key={h} className="flex flex-col items-center gap-2"><div className={cn('w-7 rounded-t', i===4?'bg-[#D4A853]':'bg-[#003478]')} style={{height:`${h}%`}}/><span className="font-body text-xs text-ink/45">{i+1}월</span></div>)}</div></Card></section>
      <section><h2 className="mb-3 font-title text-base font-bold text-ink">자주 쓰는 분야</h2><Card>{[['일기','62%'],['수필','31%'],['에세이','7%']].map(([l,p])=><div key={l} className="mb-3 grid grid-cols-[52px_1fr_38px] items-center gap-2 font-body text-sm"><span>{l}</span><div className="h-2 rounded-full bg-[#F5F0E8]"><div className="h-full rounded-full bg-[#003478]" style={{width:p}}/></div><span>{p}</span></div>)}</Card></section>
      <Card className="bg-[#F5F0E8]"><p className="font-body text-sm leading-[1.7] text-ink/70">오후 8~10시에 가장 많이<br />글을 써요.</p><p className="mt-3 font-title text-base font-bold text-ink">🌙 저녁형 작가예요</p></Card>
      <button type="button" onClick={() => go('report')} className="h-[52px] w-full rounded-[16px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">성장 리포트 보기 →</button>
    </main></section>
  )
}

function Report({ go }) { return <section className="min-h-dvh pb-6"><TopBar title="성장 리포트" onBack={() => go('stats')} /><main className="pt-8 text-center"><Hani pose="cheering" face="happy" size={90} animate="none"/><p className="mt-4 font-hani-bubble text-[20px] text-ink">이만큼 성장했어요!</p><Card className="mt-7 text-left"><p>📅 시작일 <span className="float-right">2026.03.01</span></p><p className="mt-2">📝 총 작성일 <span className="float-right">47일</span></p><p className="mt-2">🔥 최장 스트릭 <span className="float-right">15일</span></p></Card><h2 className="mb-3 mt-7 text-left font-title font-bold">글자수 변화</h2><Card className="text-left"><p>첫 달 평균 <b className="float-right">102자</b></p><p>이번 달 평균 <b className="float-right">391자</b></p>{[['3월','102자','35%'],['4월','287자','70%'],['5월','391자','100%']].map(([m,c,w])=><p key={m} className="mt-4 font-body text-sm">{m} <span className="inline-block h-3 rounded bg-[#003478]" style={{width:w}}/> {c}</p>)}</Card><p className="mt-6 font-hani-bubble text-[19px] text-ink">첫 달보다 3.8배<br />더 쓰고 있어요!</p></main></section> }

function BookCover({ go }) { return <section className="min-h-dvh pb-6"><TopBar title="나의 책" onBack={() => go('home')} /><main className="pt-7"><div className="mx-auto aspect-[3/4] w-[78%] rounded-r bg-[#F0EBE0] p-8 text-center shadow-[-4px_4px_16px_rgba(0,0,0,0.2)]"><div className="flex h-full flex-col justify-end"><h2 className="font-title text-xl font-bold text-ink">글쓴이의 글모음</h2><p className="mt-2 font-body text-sm text-ink/55">2026년 봄</p><p className="mt-8 font-body text-sm text-ink/55">47편 · 18,420자</p></div></div><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={()=>go('read')} className="h-[52px] rounded-[14px] bg-[#003478] font-body text-sm font-bold text-white">📖 책 읽기</button><button onClick={()=>go('share')} className="h-[52px] rounded-[14px] border border-[#E8E2D9] font-body text-sm font-bold text-ink/60">🔗 공유하기</button></div><Card className="mt-6"><h2 className="font-title font-bold">목차</h2>{['오늘 있었던 일','봄비 내리는 날','4월의 마지막 기록'].map((t,i)=><p key={t} className="mt-3 font-body text-sm">{i+1}. {t}<span className="float-right text-[#9E9590]">5.{7-i}</span></p>)}<button className="mt-4 w-full text-right font-body text-xs text-ink/45">전체 보기 &gt;</button></Card></main></section> }

function ReadMode({ go }) { return <section className="min-h-dvh pb-20"><header className="fixed left-1/2 top-0 z-30 flex h-14 w-full max-w-lg -translate-x-1/2 items-center justify-between border-b border-[#E8E2D9] hanji-bg px-4"><button onClick={()=>go('book')} className="font-body text-sm">✕ 닫기</button><span className="font-body text-sm text-ink/55">1 / 47</span></header><main className="px-3 pt-24 text-center"><p className="font-body text-[13px] text-[#9E9590]">2026년 5월 7일</p><h1 className="mt-6 font-title text-[22px] font-bold">오늘 있었던 일</h1><div className="my-6 border-t border-[#E8E2D9]"/><p className="px-3 text-left font-title text-[17px] leading-[2.0]">{sampleEntry.body}</p></main><footer className="fixed bottom-0 left-1/2 flex h-14 w-full max-w-lg -translate-x-1/2 items-center justify-between border-t border-[#E8E2D9] hanji-bg px-4"><button>&lt; 이전</button><button>다음 &gt;</button></footer></section> }

function Share({ go }) { return <Sheet title="공유하기" onClose={()=>go('book')}><Card className="mb-6"><p className="font-title font-bold">한-글</p><p className="mt-4 font-body text-sm">글쓴이의 글</p><div className="my-3 border-t"/><h3 className="font-title font-bold">오늘 있었던 일</h3><p className="mt-2 font-body text-sm text-ink/55">오늘은 오랜만에...</p><p className="mt-3 font-body text-xs text-ink/45">2026.05.07</p></Card>{['📷 이미지 저장','🔗 링크 복사','📤 다른 앱으로 공유'].map(a=><button key={a} className="mb-3 h-12 w-full rounded-[14px] border border-[#E8E2D9] text-left px-4 font-body text-sm">{a}</button>)}</Sheet> }

function Sheet({ title, children, onClose }) { return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1A2E]/25"><section className="hanji-bg w-full max-w-lg rounded-t-[20px] border border-[#E8E2D9] px-5 pb-6 pt-3"><div className="mx-auto mb-4 h-1 w-10 rounded bg-[#9E9590]/45"/><header className="mb-5 flex justify-between"><h2 className="font-title text-lg font-bold">{title}</h2><button onClick={onClose}>✕</button></header>{children}</section></div> }

function EmotionTags({ go }) { const [selected,setSelected]=useState([]); const toggle=(m)=>setSelected(s=>s.includes(m)?s.filter(x=>x!==m):[...s,m]); return <Sheet title={'오늘 글을 쓰고 나서\n어떤 기분인가요?'} onClose={()=>go('home')}><div className="mb-5 flex gap-3"><Hani pose="default" face="default" size={68}/><p className="font-hani-bubble text-[18px]">기분을 기록해두면<br/>나중에 돌아보기 좋아요.</p></div><div className="grid grid-cols-4 gap-3">{emotions.map(([e,l])=><button key={l} onClick={()=>toggle(l)} className={cn('rounded-[12px] bg-[#F5F0E8] p-3 text-center',selected.includes(l)&&'border-2 border-[#003478] bg-[#EEF2FA]')}><p className="text-2xl">{e}</p><p className="mt-1 text-[11px]">{l}</p></button>)}</div><div className="mt-6 grid grid-cols-2 gap-3"><button className="h-12 rounded-[14px] border">건너뛰기</button><button disabled={!selected.length} className="h-12 rounded-[14px] bg-[#003478] font-bold text-white disabled:bg-[#E8E2D9]">저장</button></div></Sheet> }

function EmotionCalendar({ go }) { return <section className="min-h-dvh"><TopBar title="감정 달력" onBack={()=>go('home')} /><main className="pt-7"><h2 className="font-title font-bold">2026년 5월 <span className="float-right font-body text-sm text-ink/45">&lt; &gt;</span></h2><div className="mt-6 grid grid-cols-7 gap-2 text-center font-body text-sm">{Array.from({length:31},(_,i)=><div key={i}><p>{i+1}</p><p>{['😊','😌','😤','🤔','😄','😢','😌'][i%7]}</p></div>)}</div><h2 className="mt-8 font-title font-bold">이번 달 감정 요약</h2><Card className="mt-3"><p className="font-body text-sm">가장 많은 감정</p><p className="mt-2 font-title font-bold">😊 홀가분함 12회</p>{[['😊','40%'],['😌','27%'],['😄','20%']].map(([e,p])=><p key={e} className="mt-3">{e} <span className="inline-block h-2 rounded bg-[#003478]" style={{width:p}}/> {p}</p>)}<p className="mt-3">기타 13%</p></Card></main></section> }

function Streak({ go }) { return <section><TopBar title="연속 작성" onBack={()=>go('home')} /><main className="pt-7"><Card className="text-center"><p className="text-4xl">🔥</p><p className="font-title text-[64px] font-bold text-[#003478]">12</p><p>일 연속</p><p className="mt-5 font-body text-sm text-ink/55">최고 기록 15일<br/>시작일 4월 26일</p></Card><h2 className="mt-7 font-title font-bold">이번 달 달성 현황</h2><Card className="mt-3 text-center"><p>일 월 화 수 목 금 토</p><p className="mt-3 text-xl tracking-widest">● ● ● ● ● ● ●</p><p className="mt-2 text-xl tracking-widest">● ● ● ● ● ○ ○</p><p className="mt-2 text-xl tracking-widest text-ink/25">○ ○ ○ ○ ○ ○ ○</p></Card><p className="mt-6 font-hani-bubble text-[19px]">12일 연속이에요!<br/>15일 기록을 넘어봐요</p></main></section> }

function Badges({ go, setBadge }) { const badges=[['🌱','첫글',1],['📝','7일',1],['🔥','30일',1],['📚','100',1],['🌙','야간',1],['✨','표현',1],['░░░','잠금',0],['░░░','잠금',0]]; return <section><TopBar title="뱃지" onBack={()=>go('home')} /><main className="pt-7"><p className="font-body text-sm font-bold">획득한 뱃지 <span className="ml-2 text-ink/45">7 / 24</span></p><div className="mt-5 grid grid-cols-4 gap-3">{badges.map(([e,n,ok],i)=><button key={i} onClick={()=>{setBadge([e,n,ok]);}} className={cn('rounded-[12px] border-[1.5px] p-3 text-center',ok?'border-[#D4A853] bg-[#FFF8E7]':'border-[#E8E2D9] bg-[#F5F0E8]')}><p className={cn('text-3xl',!ok&&'opacity-30')}>{e}</p><p className={cn('mt-1 text-[11px]',ok?'text-[#1A1A2E]':'text-[#9E9590]')}>{n}</p></button>)}</div><h2 className="mt-8 font-title font-bold">다음 뱃지</h2><Card className="mt-3"><p className="font-body font-bold">🔥 60일 연속</p><p className="mt-2 font-body text-sm text-ink/55">현재 12일 / 60일</p><div className="mt-4 h-2 rounded-full bg-[#E8E2D9]"><div className="h-full w-1/5 rounded-full bg-[#003478]"/></div></Card></main></section> }

function BadgeModal({ badge, onClose }) { if(!badge) return null; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/35 px-6"><section className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center"><p className="text-[64px]">{badge[0]}</p><h2 className="font-title text-lg font-bold">30일 연속 작성</h2><p className="mt-5 font-body text-sm leading-[1.7] text-ink/60">30일 연속으로 글을<br/>쓴 작가에게 주어지는<br/>뱃지예요.</p><p className="mt-5 font-body text-sm text-ink/55">획득일 2026.04.25</p><button onClick={onClose} className="mt-6 h-12 w-full rounded-[14px] bg-[#003478] font-bold text-white">확인</button></section></div> }

function EmptyState() { return <section className="min-h-dvh pb-20"><TopBar title="기록" /><main className="flex min-h-[70dvh] flex-col items-center justify-center text-center"><Hani pose="holding" face="thinking" size={134}/><h1 className="mt-7 font-title text-xl font-bold">아직 기록이 없어요.</h1><p className="mt-4 font-body text-sm leading-[1.7] text-[#6B6560]">첫 글을 쓰면<br/>여기에 쌓이기 시작해요.</p><Link href="/write" className="mt-8 flex h-14 w-full items-center justify-center rounded-[16px] bg-[#003478] font-body font-bold text-white">첫 글 쓰러 가기 →</Link></main></section> }

function LibraryPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [view, setView] = useState(searchParams.get('view') ?? 'home')
  const [selectedDay, setSelectedDay] = useState(7)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [badge, setBadge] = useState(null)
  const go = (next) => { setView(next); router.replace(`/library${next === 'home' ? '' : `?view=${next}`}`, { scroll: false }) }

  return <PageLayout hasTopBar={false} className="px-4 pb-0">
    {view === 'home' && <RecordHome selectedDay={selectedDay} setSelectedDay={setSelectedDay} go={go} />}
    {view === 'empty' && <EmptyState />}
    {view === 'detail' && <Detail go={go} setDeleteOpen={setDeleteOpen} />}
    {view === 'list' && <List go={go} />}
    {view === 'stats' && <Stats go={go} />}
    {view === 'report' && <Report go={go} />}
    {view === 'book' && <BookCover go={go} />}
    {view === 'read' && <ReadMode go={go} />}
    {view === 'share' && <><BookCover go={go} /><Share go={go} /></>}
    {view === 'emotion' && <><RecordHome selectedDay={selectedDay} setSelectedDay={setSelectedDay} go={go} /><EmotionTags go={go} /></>}
    {view === 'emotion-calendar' && <EmotionCalendar go={go} />}
    {view === 'streak' && <Streak go={go} />}
    {view === 'badges' && <Badges go={go} setBadge={setBadge} />}
    {deleteOpen && <DeleteModal onClose={() => setDeleteOpen(false)} onDelete={() => { setDeleteOpen(false); go('home') }} />}
    <BadgeModal badge={badge} onClose={() => setBadge(null)} />
  </PageLayout>
}


export default function LibraryPage() {
  return (
    <Suspense fallback={null}>
      <LibraryPageInner />
    </Suspense>
  )
}
