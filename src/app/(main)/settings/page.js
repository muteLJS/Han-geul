// src/app/(main)/settings/page.js
'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { Hani } from '@/components/hani/Hani'
import { cn } from '@/utils/cn'

const nickname = '글벗이'
const email = 'abc@gmail.com'

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

function Card({ children, className }) {
  return <section className={cn('rounded-[16px] border border-[#E8E2D9] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]', className)}>{children}</section>
}

function Row({ label, value, onClick, danger = false }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-between py-3 text-left font-body text-sm">
      <span className={danger ? 'text-[#CD2E3A]' : 'text-ink'}>{label}</span>
      <span className="text-ink/45">{value ?? '>'}</span>
    </button>
  )
}

function Toggle({ on }) {
  return <span className={cn('inline-flex h-6 w-11 items-center rounded-full px-1', on ? 'justify-end bg-[#003478]' : 'justify-start bg-[#E8E2D9]')}><span className="h-4 w-4 rounded-full bg-white" /></span>
}

function Modal({ children }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/35 px-6"><section className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)]">{children}</section></div>
}

function Sheet({ title, children, onClose }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1A2E]/25"><section className="hanji-bg w-full max-w-lg rounded-t-[20px] border border-[#E8E2D9] px-5 pb-6 pt-3"><div className="mx-auto mb-4 h-1 w-10 rounded bg-[#9E9590]/45" /><header className="mb-5 flex justify-between"><h2 className="font-title text-lg font-bold whitespace-pre-line">{title}</h2><button onClick={onClose}>✕</button></header>{children}</section></div>
}

function SettingsHome({ go, setLogoutOpen }) {
  return <section className="min-h-dvh pb-6"><TopBar title="설정" onBack={() => history.back()} /><main className="pt-6 space-y-7">
    <Card><div className="flex items-center gap-3"><Hani pose="default" face="default" size={68} /><div><p className="font-body text-sm font-bold text-ink">{nickname}님</p><p className="font-body text-xs text-[#9E9590]">{email}</p></div><button onClick={()=>go('profile')} className="ml-auto font-body text-xs text-ink/45">프로필 편집&gt;</button></div></Card>
    <Section title="글쓰기 설정"><Row label="일일 목표 글자수" value="100자 >" onClick={()=>go('goal')} /><Row label="알림 설정" onClick={()=>go('notifications')} /><Row label="기본 분야" value="일기/감성 >" /></Section>
    <Section title="앱 설정"><Row label="테마" value="라이트 >" onClick={()=>go('screen')} /><Row label="폰트 크기" value="보통 >" onClick={()=>go('screen')} /><Row label="언어" value="한국어 >" /></Section>
    <Section title="계정"><Row label="구독 관리" onClick={()=>go('subscription')} /><Row label="데이터 내보내기" onClick={()=>go('export')} /><Row label="로그아웃" onClick={()=>setLogoutOpen(true)} /><Row label="회원 탈퇴" onClick={()=>go('delete')} danger /></Section>
    <Section title="기타"><Row label="이용약관" /><Row label="개인정보처리방침" /><Row label="앱 버전" value="1.0.0" /></Section>
  </main></section>
}
function Section({ title, children }) { return <section><h2 className="mb-3 font-title text-base font-bold text-ink">{title}</h2><Card className="divide-y divide-[#E8E2D9] py-2">{children}</Card></section> }

function Profile({ go }) { const [name,setName]=useState(nickname); return <section><TopBar title="프로필 편집" onBack={()=>go('home')} /><main className="pt-7"><Link href="/hani" className="block rounded-[20px] border border-[#E8E2D9] bg-white p-5 text-center"><Hani pose="cheering" face="happy" size={134} /><p className="mt-2 font-body text-sm text-ink/60">✏️ 꾸미기</p></Link><Label title="닉네임"><input value={name} maxLength={8} onChange={e=>setName(e.target.value)} className="w-full bg-transparent outline-none"/><span className="float-right text-ink/45">{name.length}/8</span></Label><Label title="한 줄 소개 (선택)"><input defaultValue="매일 글 쓰는 사람" className="w-full bg-transparent outline-none"/></Label><Label title="이메일"><p className="text-ink/55">{email} (변경 불가)</p></Label><button className="mt-7 h-14 w-full rounded-[16px] bg-[#003478] font-body font-bold text-white">저장하기</button></main></section> }
function Label({ title, children }) { return <section className="mt-6"><h2 className="mb-2 font-title text-base font-bold">{title}</h2><div className="rounded-[14px] border border-[#E8E2D9] bg-white p-4 font-body text-sm">{children}</div></section> }

function Goal({ go }) { const [goal,setGoal]=useState(100); const opts=[[50,'가볍게 시작'],[100,'기본 추천'],[200,'꾸준한 습관'],[300,'진지하게'],[500,'도전적으로']]; return <section><TopBar title="일일 목표" onBack={()=>go('home')} /><main className="pt-7"><div className="flex gap-3"><Hani size={68}/><p className="font-hani-bubble text-[19px]">얼마나 쓰고 싶으세요?</p></div><Card className="mt-6">{opts.map(([n,d])=><button key={n} onClick={()=>setGoal(n)} className="block w-full py-3 text-left font-body text-sm">{goal===n?'●':'○'} &nbsp;{n}자 <span className="ml-3 text-ink/50">{d}</span></button>)}</Card><Label title="직접 입력"><input value={`${goal}자`} onChange={()=>{}} className="bg-transparent outline-none"/></Label><button className="mt-7 h-14 w-full rounded-[16px] bg-[#003478] font-body font-bold text-white">저장하기</button></main></section> }

function Notifications({ go, openTime }) { return <section><TopBar title="알림 설정" onBack={()=>go('home')} /><main className="pt-7 space-y-7"><Section title="글쓰기 알림"><div className="flex justify-between py-3"><span>매일 알림</span><Toggle on /></div><button onClick={openTime} className="flex w-full justify-between py-3"><span>알림 시간</span><span>오후 8시 &gt;</span></button></Section><Section title="스트릭 알림"><div className="flex justify-between py-3"><span>스트릭 위기 알림</span><Toggle on /></div><p className="font-body text-xs text-ink/45">(자정 2시간 전 미작성 시)</p></Section><Section title="기타 알림"><div className="flex justify-between py-3"><span>뱃지 획득 알림</span><Toggle on /></div><div className="flex justify-between py-3"><span>포인트 적립 알림</span><Toggle /></div><div className="flex justify-between py-3"><span>공지 및 이벤트</span><Toggle on /></div></Section><div className="flex gap-3"><Hani size={68}/><p className="font-hani-bubble text-[18px]">알림을 꺼도 글은 언제든<br/>쓸 수 있어요.</p></div></main></section> }
function TimeSheet({ onClose }) { return <Sheet title="알림 시간 설정" onClose={onClose}><Card className="text-center font-body text-lg leading-[2.2]"><p>오전 &nbsp; | &nbsp; 07 &nbsp; | &nbsp; 00</p><p className="border-y border-[#E8E2D9] font-bold text-[#003478]">▶ 오후 &nbsp; | ▶ 08 &nbsp; | ▶ 00</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp; 09 &nbsp; | &nbsp; 30</p></Card><p className="mt-5 font-body text-sm leading-[1.7] text-ink/65">매일 오후 8시 00분에<br/>알림을 보내드려요.</p><button onClick={onClose} className="mt-6 h-14 w-full rounded-[16px] bg-[#003478] font-body font-bold text-white">확인</button></Sheet> }

function Subscription({ go }) { return <section><TopBar title="구독 관리" onBack={()=>go('home')} /><main className="pt-7"><p className="font-body text-[13px] text-[#9E9590]">현재 플랜 무료</p><Card className="mt-5"><h2 className="font-title text-lg font-bold">✨ 한-글 프리미엄</h2><ul className="mt-5 space-y-2 font-body text-sm"><li>✓ 되짚음 무제한</li><li>✓ 어휘 연습 무제한</li><li>✓ 필사 무제한</li><li>✓ 글 다듬기 무제한</li><li>✓ 배경지 · 폰트 전체</li><li>✓ 광고 없음</li></ul><p className="mt-6 font-title text-2xl font-bold">월 4,900원</p><p className="mt-2 font-body text-sm text-ink/55">연 39,000원 (33% 할인)</p><button className="mt-5 h-12 w-full rounded-[14px] bg-[#003478] font-body font-bold text-white">월간 구독 시작하기</button><button className="mt-3 h-12 w-full rounded-[14px] bg-[#D4A853] font-body font-bold text-white">연간 구독 시작하기</button></Card><p className="mt-6 font-body text-sm leading-[1.8] text-ink/60">구독 관련 안내<br/>• 구독은 언제든 해지 가능<br/>• 해지 후 기간 만료까지 이용 가능<br/>• 결제는 앱스토어를 통해 이루어져요</p></main></section> }
function ExportData({ go }) { return <section><TopBar title="데이터 내보내기" onBack={()=>go('home')} /><main className="pt-7"><div className="flex gap-3"><Hani size={68}/><p className="font-hani-bubble text-[19px]">내 글을 가져갈 수 있어요.</p></div><h2 className="mt-7 mb-3 font-title font-bold">내보내기 형식</h2>{[['📄 TXT','텍스트 파일로 저장'],['📋 PDF','책 형태로 저장'],['📊 JSON','데이터 원본 파일']].map(([t,d])=><Card key={t} className="mb-3"><p className="font-body font-bold">{t}<span className="float-right text-ink/45">→</span></p><p className="mt-2 font-body text-sm text-ink/55">{d}</p></Card>)}<p className="mt-7 font-body text-sm leading-[1.8] text-ink/60">총 47편 · 18,420자<br/>마지막 내보내기 없음</p></main></section> }
function DeleteAccount({ go }) { const [input,setInput]=useState(''); return <section><TopBar title="회원 탈퇴" onBack={()=>go('home')} /><main className="pt-8 text-center"><Hani pose="shy" face="comfort" size={90}/><p className="mt-4 font-hani-bubble text-[20px]">정말 떠나시는 건가요?</p><h2 className="mt-7 mb-3 text-left font-title font-bold">탈퇴하면 사라지는 것들</h2><Card className="text-left font-body text-sm leading-[2]"><p>✕ 작성한 글 47편</p><p>✕ 포인트 1,240pt</p><p>✕ 뱃지 7개</p><p>✕ 스트릭 기록</p></Card><p className="mt-5 text-left font-body text-sm leading-[1.8] text-ink/60">복구할 수 없어요.<br/>탈퇴 전에 데이터를 내보내는 것을 추천해요.</p><button onClick={()=>go('export')} className="mt-5 h-12 w-full rounded-[14px] border border-[#E8E2D9] font-body font-bold">데이터 내보내기 →</button><p className="mt-6 text-left font-body text-sm">확인을 위해 닉네임을 입력해주세요.</p><input value={input} onChange={e=>setInput(e.target.value)} className="mt-2 h-12 w-full rounded-[14px] border border-[#E8E2D9] bg-white px-4 outline-none"/><button disabled={input!==nickname} className="mt-5 h-12 w-full rounded-[14px] bg-[#CD2E3A] font-body font-bold text-white disabled:bg-[#E8E2D9] disabled:text-[#9E9590]">탈퇴하기</button></main></section> }
function Screen({ go }) { const [size,setSize]=useState(16); return <section><TopBar title="화면 설정" onBack={()=>go('home')} /><main className="pt-7"><h2 className="mb-3 font-title font-bold">테마</h2><Card><p className="font-body text-sm">● 라이트 &nbsp;&nbsp; ○ 다크</p><p className="mt-3 font-body text-sm">○ 시스템 설정 따르기</p></Card><h2 className="mt-7 mb-3 font-title font-bold">폰트 크기</h2><Card><div className="flex items-center gap-3"><span>가</span><input type="range" min="14" max="20" value={size} onChange={e=>setSize(Number(e.target.value))} className="flex-1"/><span className="text-xl">가</span></div><p className="mt-2 flex justify-between font-body text-xs text-ink/45"><span>작게</span><span>크게</span></p></Card><h2 className="mt-7 mb-3 font-title font-bold">미리보기</h2><Card><p className="font-title leading-[1.8]" style={{fontSize:size}}>오늘은 오랜만에 친구를<br/>만났다.</p></Card><button className="mt-7 h-14 w-full rounded-[16px] bg-[#003478] font-body font-bold text-white">저장하기</button></main></section> }
function LogoutModal({ onClose }) { return <Modal><h2 className="font-title text-lg font-bold">로그아웃 할까요?</h2><p className="mt-5 font-body text-sm leading-[1.7] text-ink/60">다시 로그인하면<br/>모든 기록이 그대로<br/>있어요.</p><div className="mt-7 grid grid-cols-2 gap-3"><button onClick={onClose} className="h-12 rounded-[14px] border border-[#E8E2D9] font-bold">취소</button><button onClick={onClose} className="h-12 rounded-[14px] bg-[#003478] font-bold text-white">로그아웃</button></div></Modal> }

function SettingsPageInner() {
  const router = useRouter(); const searchParams = useSearchParams(); const [view,setView]=useState(searchParams.get('view')??'home'); const [timeOpen,setTimeOpen]=useState(false); const [logoutOpen,setLogoutOpen]=useState(false)
  const go=(next)=>{setView(next); router.replace(`/settings${next==='home'?'':`?view=${next}`}`,{scroll:false})}
  return <PageLayout hasTopBar={false} hasBottomTab={false} className="px-4 pb-6">
    {view==='home'&&<SettingsHome go={go} setLogoutOpen={setLogoutOpen}/>} {view==='profile'&&<Profile go={go}/>} {view==='goal'&&<Goal go={go}/>} {view==='notifications'&&<Notifications go={go} openTime={()=>setTimeOpen(true)}/>} {view==='subscription'&&<Subscription go={go}/>} {view==='export'&&<ExportData go={go}/>} {view==='delete'&&<DeleteAccount go={go}/>} {view==='screen'&&<Screen go={go}/>} {timeOpen&&<TimeSheet onClose={()=>setTimeOpen(false)}/>} {logoutOpen&&<LogoutModal onClose={()=>setLogoutOpen(false)}/>} 
  </PageLayout>
}


export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsPageInner />
    </Suspense>
  )
}
