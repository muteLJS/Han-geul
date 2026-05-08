// src/app/api/notifications/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Notification from '@/models/Notification'

function sanitize(value, max = 500) {
  return String(value ?? '').replace(/[<>]/g, '').slice(0, max).trim()
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await connectDB()
  const notifications = await Notification.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(100).lean()
  return NextResponse.json({ notifications })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const payload = await request.json()
  await connectDB()
  const notification = await Notification.create({
    userId: session.user.id,
    type: ['streak', 'badge', 'writing', 'point', 'system'].includes(payload.type) ? payload.type : 'system',
    title: sanitize(payload.title, 80),
    body: sanitize(payload.body, 300),
    href: sanitize(payload.href || '/', 200),
  })
  return NextResponse.json({ notification }, { status: 201 })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const payload = await request.json()
  await connectDB()
  if (payload.allRead) {
    await Notification.updateMany({ userId: session.user.id }, { read: true })
    return NextResponse.json({ ok: true })
  }
  const notification = await Notification.findOneAndUpdate(
    { _id: sanitize(payload.id, 80), userId: session.user.id },
    { read: Boolean(payload.read) },
    { new: true },
  )
  return NextResponse.json({ notification })
}
