// src/app/layout.js
import './globals.css'
import { Noto_Serif_KR, Noto_Sans_KR, Nanum_Pen_Script } from 'next/font/google'
import SessionProvider from '@/components/providers/SessionProvider'

const notoSerif = Noto_Serif_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap',
})

const notoSans = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const nanumPen = Nanum_Pen_Script({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-hani',
  display: 'swap',
})

export const metadata = {
  title: {
    default:  '한-글 | 나만의 글쓰기 공간',
    template: '%s | 한-글',
  },
  description: '한국어로 쓰고, 성장하고, 나만의 책을 만드는 글쓰기 플랫폼',
  keywords:    ['글쓰기', '한국어', '필사', '어휘', '나만의 책'],
  openGraph: {
    title:       '한-글',
    description: '한국어로 쓰고, 성장하고, 나만의 책을 만드는 글쓰기 플랫폼',
    locale:      'ko_KR',
    type:        'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  const session = null

  return (
    <html lang="ko" className={`${notoSerif.variable} ${notoSans.variable} ${nanumPen.variable}`}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
