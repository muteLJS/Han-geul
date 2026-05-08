// src/components/ui/EmptyState.js
import { Hani } from '@/components/hani/Hani'

const messages = {
  writing: '첫 글을 쓰면 여기에 쌓여요.',
  search: '다른 단어로 찾아볼까요?',
  notification: '글을 쓰면 한이가 소식을 전해드려요.',
  record: '이날은 글이 없어요. 지금 써볼까요?',
}

export function EmptyState({ content = '콘텐츠', message, type = 'writing', cta }) {
  return (
    <section className="flex min-h-[60dvh] flex-col items-center justify-center text-center">
      <Hani pose="thinking" face="thinking" size={134} animate="float" />
      <h2 className="mt-8 font-title text-xl font-bold text-ink">아직 {content}가 없어요.</h2>
      <p className="mt-4 font-body text-sm leading-[1.7] text-[#6B6560]">{message ?? messages[type]}</p>
      {cta && <div className="mt-8 w-full">{cta}</div>}
    </section>
  )
}
