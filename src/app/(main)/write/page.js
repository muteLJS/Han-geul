// src/app/(main)/write/page.js
'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const canSave = title.trim().length > 0 || body.trim().length > 0

  return (
    <PageLayout hasBottomTab={false} className="pb-6">
      <header className="flex items-center justify-between pt-6 pb-5">
        <h1 className="font-title text-2xl font-bold text-ink">글쓰기</h1>
        <button
          type="button"
          disabled={!canSave}
          className="rounded-full bg-[#003478] px-4 py-2 font-body text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[#E8E2D9] disabled:text-[#9E9590]"
        >
          저장
        </button>
      </header>

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="제목을 입력해주세요"
        className="w-full border-b border-[#3A3530]/10 bg-transparent py-4 font-title text-2xl font-bold outline-none placeholder:text-[#3A3530]/30"
      />
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="오늘의 글을 써보세요."
        className="mt-6 min-h-[55dvh] w-full resize-none bg-transparent font-body text-base leading-8 outline-none placeholder:text-[#3A3530]/30"
      />
    </PageLayout>
  )
}
