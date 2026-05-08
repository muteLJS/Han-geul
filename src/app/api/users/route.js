// src/app/api/users/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

function sanitize(value, max = 120) {
  return String(value ?? '').replace(/[<>]/g, '').slice(0, max).trim()
}

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null
  return session
}

export async function GET() {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await connectDB()
  const user = await User.findById(session.user.id).lean()
  return NextResponse.json({ user })
}

export async function PATCH(request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const payload = await request.json()
  const update = {}

  if ('nickname' in payload) update.nickname = sanitize(payload.nickname, 8)
  if ('name' in payload) update.name = sanitize(payload.name, 32)
  if ('purpose' in payload) update.purpose = sanitize(payload.purpose, 200)
  if ('vocabLevel' in payload) update.vocabLevel = Math.min(5, Math.max(1, Number(payload.vocabLevel) || 1))
  if ('onboardingCompleted' in payload) update.onboardingCompleted = Boolean(payload.onboardingCompleted)
  if (['public', 'link', 'private'].includes(payload.defaultVisibility)) update.defaultVisibility = payload.defaultVisibility
  update.updatedAt = new Date()

  await connectDB()
  const user = await User.findByIdAndUpdate(session.user.id, update, { new: true })
  return NextResponse.json({ user })
}
