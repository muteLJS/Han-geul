// src/app/api/posts/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import WritingEntry from '@/models/WritingEntry'
import PointTransaction from '@/models/PointTransaction'
import User from '@/models/User'

function sanitizeText(value, max = 20000) {
  return String(value ?? '').replace(/[<>]/g, '').slice(0, max).trim()
}

function getWordCount(body) {
  return sanitizeText(body, 30000).replace(/\s/g, '').length
}

function getPointsForSave(wordCount) {
  let points = 0
  if (wordCount >= 100) points += 10
  if (wordCount >= 150) points += 3
  if (wordCount >= 200) points += 7
  if (wordCount >= 300) points += 15
  return points
}

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null
  return session
}

export async function GET(request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  await connectDB()
  const { searchParams } = new URL(request.url)
  const draft = searchParams.get('draft')
  const limit = Math.min(Number(searchParams.get('limit') ?? 50), 100)

  const query = { authorId: session.user.id }
  if (draft === 'true') query.isDraft = true
  if (draft === 'false') query.isDraft = false

  const posts = await WritingEntry
    .find(query)
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean()

  return NextResponse.json({ posts })
}

export async function POST(request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const payload = await request.json()
  const title = sanitizeText(payload.title, 120)
  const body = sanitizeText(payload.body, 30000)
  const type = ['free', 'self', 'copying'].includes(payload.type) ? payload.type : 'free'
  const isDraft = Boolean(payload.isDraft)

  if (!body) {
    return NextResponse.json({ error: 'body_required' }, { status: 400 })
  }

  await connectDB()
  const post = await WritingEntry.create({
    authorId: session.user.id,
    title,
    body,
    type,
    isDraft,
    visibility: ['public', 'link', 'private'].includes(payload.visibility) ? payload.visibility : 'private',
  })

  let awardedPoints = 0
  if (!isDraft) {
    awardedPoints = getPointsForSave(post.wordCount)
    if (awardedPoints > 0) {
      await Promise.all([
        User.findByIdAndUpdate(session.user.id, { $inc: { points: awardedPoints } }),
        PointTransaction.create({
          userId: session.user.id,
          label: '글쓰기 완료',
          amount: awardedPoints,
          kind: 'gain',
          memo: `${post.wordCount}자`,
        }),
      ])
    }
  }

  return NextResponse.json({ post, awardedPoints }, { status: 201 })
}

export async function PATCH(request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const payload = await request.json()
  const id = sanitizeText(payload.id, 80)
  if (!id) return NextResponse.json({ error: 'id_required' }, { status: 400 })

  const update = {}
  if ('title' in payload) update.title = sanitizeText(payload.title, 120)
  if ('body' in payload) {
    update.body = sanitizeText(payload.body, 30000)
    update.wordCount = getWordCount(payload.body)
  }
  if ('isDraft' in payload) update.isDraft = Boolean(payload.isDraft)
  if (['free', 'self', 'copying'].includes(payload.type)) update.type = payload.type
  if (['public', 'link', 'private'].includes(payload.visibility)) update.visibility = payload.visibility
  update.updatedAt = new Date()

  await connectDB()
  const post = await WritingEntry.findOneAndUpdate(
    { _id: id, authorId: session.user.id },
    update,
    { new: true },
  )

  if (!post) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ post })
}

export async function DELETE(request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = sanitizeText(searchParams.get('id'), 80)
  if (!id) return NextResponse.json({ error: 'id_required' }, { status: 400 })

  await connectDB()
  const deleted = await WritingEntry.findOneAndDelete({ _id: id, authorId: session.user.id })
  if (!deleted) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
