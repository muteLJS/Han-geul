// src/components/home/MissionSection.js
'use client'

import { useSession } from 'next-auth/react'
import { pointRules } from '@/styles/tokens'
import { cn } from '@/utils/cn'

// 오늘의 미션 목록 (총괄본 기준)
const MISSIONS = [
  {
    key:     'write100',
    label:   '오늘 100자 쓰기',
    points:  pointRules.write100,
    href:    '/write',
  },
  {
    key:     'vocabulary',
    label:   '어휘 문제 1세트 풀기',
    points:  pointRules.vocabulary,
    href:    '/vocabulary',
  },
  {
    key:     'copying',
    label:   '필사 한 편 완성하기',
    points:  pointRules.copying,
    href:    '/copying',
  },
]

export function MissionSection({ completedMissions = [] }) {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <section className="mb-6">
      <h3 className="text-sm font-title font-semibold text-[#1A1714] mb-3">
        오늘의 미션
      </h3>

      <ul className="flex flex-col gap-2">
        {MISSIONS.map((mission) => {
          const done = completedMissions.includes(mission.key)

          return (
            <li key={mission.key}>
              <a
                href={done ? undefined : mission.href}
                className={cn(
                  'flex items-center justify-between',
                  'px-4 py-3 rounded-xl',
                  'transition-all duration-150',
                  done
                    ? 'bg-[#F5F0E8] opacity-50 cursor-default'
                    : 'bg-[#F5F0E8] hover:bg-[#EDE8DF] active:scale-[0.98]'
                )}
              >
                <div className="flex items-center gap-3">
                  {/* 완료 체크 */}
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    done
                      ? 'border-[#4A7C8E] bg-[#4A7C8E]'
                      : 'border-[#3A3530]/20'
                  )}>
                    {done && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#FAF6EE" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>

                  <span className={cn(
                    'text-sm font-body',
                    done ? 'line-through text-[#3A3530]/40' : 'text-[#1A1714]'
                  )}>
                    {mission.label}
                  </span>
                </div>

                {/* 포인트 */}
                <span className={cn(
                  'text-xs font-body font-medium',
                  done ? 'text-[#3A3530]/30' : 'text-[#D4A853]'
                )}>
                  +{mission.points}P
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
